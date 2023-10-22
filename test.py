import cv2
import download
import openvino as ov
import time
from pathlib import Path

image_filename = download.download_file(
    "https://storage.openvinotoolkit.org/repositories/openvino_notebooks/data/data/image/coco_hollywood.jpg",
    directory="data"
)
image = cv2.imread(str(image_filename))
print(image.shape)

core = ov.Core()
classification_model_xml = "model/classification.xml"
model = core.read_model(model=classification_model_xml)
compiled_model = core.compile_model(model=model, device_name="CPU")
input_layer = compiled_model.input(0)
output_layer = compiled_model.output(0)

# N,C,H,W = batch size, number of channels, height, width.
N, C, H, W = input_layer.shape
# OpenCV resize expects the destination size as (width, height).
resized_image = cv2.resize(src=image, dsize=(W, H))
print(resized_image.shape)

import numpy as np

input_data = np.expand_dims(np.transpose(resized_image, (2, 0, 1)), 0).astype(np.float32)
print(input_data.shape)

# for single input models only
result = compiled_model(input_data)[output_layer]

# for multiple inputs in a list
result = compiled_model([input_data])[output_layer]

# or using a dictionary, where the key is input tensor name or index
result = compiled_model({input_layer.any_name: input_data})[output_layer]

request = compiled_model.create_infer_request()
request.infer(inputs={input_layer.any_name: input_data})
result = request.get_output_tensor(output_layer.index).data

print( result.shape )
cv2.imwrite('original_image.jpg', result)

# Change img size


core = ov.Core()
segmentation_model_xml = "model/segmentation.xml"
segmentation_model = core.read_model(model=segmentation_model_xml)
segmentation_input_layer = segmentation_model.input(0)
segmentation_output_layer = segmentation_model.output(0)

print("~~~~ ORIGINAL MODEL ~~~~")
print(f"input shape: {segmentation_input_layer.shape}")
print(f"output shape: {segmentation_output_layer.shape}")

new_shape = ov.PartialShape([1, 3, 544, 544])
segmentation_model.reshape({segmentation_input_layer.any_name: new_shape})
segmentation_compiled_model = core.compile_model(model=segmentation_model, device_name="CPU")
# help(segmentation_compiled_model)
print("~~~~ RESHAPED MODEL ~~~~")
print(f"model input shape: {segmentation_input_layer.shape}")
print(
    f"compiled_model input shape: "
    f"{segmentation_compiled_model.input(index=0).shape}"
)
print(f"compiled_model output shape: {segmentation_output_layer.shape}")

segmentation_model_xml = "model/segmentation.xml"
segmentation_model = core.read_model(model=segmentation_model_xml)
segmentation_input_layer = segmentation_model.input(0)
segmentation_output_layer = segmentation_model.output(0)
new_shape = ov.PartialShape([2, 3, 544, 544])
segmentation_model.reshape({segmentation_input_layer.any_name: new_shape})
segmentation_compiled_model = core.compile_model(model=segmentation_model, device_name="CPU")

print(f"input shape: {segmentation_input_layer.shape}")
print(f"output shape: {segmentation_output_layer.shape}")



core = ov.Core()
segmentation_model_xml = "model/segmentation.xml"
segmentation_model = core.read_model(model=segmentation_model_xml)
segmentation_input_layer = segmentation_model.input(0)
segmentation_output_layer = segmentation_model.output(0)
new_shape = ov.PartialShape([2, 3, 544, 544])
segmentation_model.reshape({segmentation_input_layer.any_name: new_shape})
segmentation_compiled_model = core.compile_model(model=segmentation_model, device_name="CPU")
input_data = np.random.rand(2, 3, 544, 544)

output = segmentation_compiled_model([input_data])

print(f"input data shape: {input_data.shape}")
print(f"result data data shape: {segmentation_output_layer.shape}")

# input data shape: (2, 3, 544, 544)
# result data data shape: [2,1,544,544]


# Caching a Model
# core = ov.Core()

# device_name = "GPU"

# if device_name in core.available_devices:
#     cache_path = Path("model/model_cache")
#     cache_path.mkdir(exist_ok=True)
#     # Enable caching for OpenVINO Runtime. To disable caching set enable_caching = False
#     enable_caching = True
#     config_dict = {"CACHE_DIR": str(cache_path)} if enable_caching else {}

#     classification_model_xml = "model/classification.xml"
#     model = core.read_model(model=classification_model_xml)

#     start_time = time.perf_counter()
#     compiled_model = core.compile_model(model=model, device_name=device_name, config=config_dict)
#     end_time = time.perf_counter()
#     print(f"Loading the network to the {device_name} device took {end_time-start_time:.2f} seconds.")
    

# if device_name in core.available_devices:
#     del compiled_model
#     start_time = time.perf_counter()
#     compiled_model = core.compile_model(model=model, device_name=device_name, config=config_dict)
#     end_time = time.perf_counter()
#     print(f"Loading the network to the {device_name} device took {end_time-start_time:.2f} seconds.")


./darknet detector demo cfg/coco.data cfg/yolov3.cfg yolov3.weights data/test.mp4 -out_filename output.mp4