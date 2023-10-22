import openvino as ov

core = ov.Core()
classification_model_xml = "model/classification.xml"
model = core.read_model(model=classification_model_xml)
model.inputs
input_layer = model.input(0)
input_layer.any_name
print(f"input precision: {input_layer.element_type}")
print(f"input shape: {input_layer.shape}")

