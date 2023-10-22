# import openvino as ov

# core = ov.Core()
# classification_model_xml = "model/classification.xml"
# model = core.read_model(model=classification_model_xml)
# model.outputs
# output_layer = model.output(0)
# output_layer.any_name
# print(f"output precision: {output_layer.element_type}")
# print(f"output shape: {output_layer.shape}")


import openvino as ov

core = ov.Core()
classification_model_xml = "model/classification.xml"
model = core.read_model(model=classification_model_xml)
compiled_model = core.compile_model(model=model, device_name="CPU")
input_layer = compiled_model.input(0)
output_layer = compiled_model.output(0)