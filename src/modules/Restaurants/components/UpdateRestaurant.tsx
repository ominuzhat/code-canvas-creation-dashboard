import React from "react";
import { RestaurantTypes } from "../types/RestaurantTypes";
import { Form } from "../../../common/CommonAnt";
import { Col, Input, InputNumber, Row, Select, Upload } from "antd";
import {
  nameValidator,
  numberValidator,
  phoneValidator,
} from "../../../utilities/validator";
import Iconify from "../../../common/IconifyConfig/IconifyConfig";
import { image_url } from "../../../utilities/images";
import { useUpdateRestaurantMutation } from "../api/restaurantsEndpoint";

interface Props {
  record: RestaurantTypes;
}

const UpdateRestaurant: React.FC<Props> = React.memo(({ record }) => {
  const [update, { isLoading, isSuccess }] = useUpdateRestaurantMutation();

  const onFinish = (values: RestaurantTypes): void => {
    const formData: FormData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (
        key === "restaurant_logo" &&
        Array.isArray(value) &&
        value[0]?.originFileObj
      ) {
        formData.append(key, value[0].originFileObj);
      } else {
        formData.append(key, value as string | Blob);
      }
    });
    console.log(Object.fromEntries(formData));
    update({ id: record.id, data: formData });
  };

  return (
    <React.Fragment>
      <Form
        onFinish={onFinish}
        isLoading={isLoading}
        isSuccess={isSuccess}
        defaultRecord={{
          ...record,
          restaurant_logo: record.restaurant_logo
            ? [
                {
                  uid: "1",
                  name: "sds",
                  statue: "done",
                  url: image_url.concat(record?.restaurant_logo),
                },
              ]
            : [],
        }}
      >
        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant Name"
              name="restaurant_name"
              rules={[
                { required: true, message: "Restaurant name is required" },
              ]}
            >
              <Input placeholder="Restaurant name" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant Address"
              name="restaurant_address"
              rules={[
                { required: true, message: "Restaurant address is required" },
              ]}
            >
              <Input placeholder="Restaurant address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant Hotline"
              name="restaurant_hotline"
              rules={[{ validator: phoneValidator }]}
            >
              <Input addonBefore="+88" placeholder="Restaurant Hotline" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant BIN Number"
              name="restaurant_bin_number"
              rules={[{ validator: numberValidator }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Restaurant BIN number"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant Owner Name"
              name="restaurant_owner_name"
              rules={[{ validator: nameValidator }]}
            >
              <Input placeholder="Owner name" />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant NBR(%)"
              name="restaurant_nbr_percentage"
              rules={[{ required: true }, { validator: numberValidator }]}
            >
              <InputNumber style={{ width: "100%" }} placeholder="NBR(%)" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[10, 10]}>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Select Restaurant Version"
              name="restaurant_version"
              rules={[
                { required: true, message: "Restaurant version is required" },
              ]}
            >
              <Select
                allowClear
                placeholder="Select One"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  ((option?.label ?? "") as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "1", label: "Version One" },
                  { value: "2", label: "Version Two" },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24} lg={12}>
            <Form.Item<RestaurantTypes>
              label="Restaurant LOGO (Image only)"
              name="restaurant_logo"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e?.fileList;
              }}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture-card"
                showUploadList={{ showRemoveIcon: true }}
              >
                <Iconify name="ant-design:plus-outlined" />
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
});

export default UpdateRestaurant;
