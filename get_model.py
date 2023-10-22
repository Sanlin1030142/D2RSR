import download

# ir_model_url = 'https://storage.openvinotoolkit.org/repositories/openvino_notebooks/models/002-example-models/'
# ir_model_name_xml = 'classification.xml'
# ir_model_name_bin = 'classification.bin'

# download.download_file(ir_model_url + ir_model_name_xml, filename=ir_model_name_xml, directory='model')
# download.download_file(ir_model_url + ir_model_name_bin, filename=ir_model_name_bin, directory='model')

ir_model_url = 'https://storage.openvinotoolkit.org/repositories/openvino_notebooks/models/002-example-models/'
ir_model_name_xml = 'segmentation.xml'
ir_model_name_bin = 'segmentation.bin'

download.download_file(ir_model_url + ir_model_name_xml, filename=ir_model_name_xml, directory='model')
download.download_file(ir_model_url + ir_model_name_bin, filename=ir_model_name_bin, directory='model')