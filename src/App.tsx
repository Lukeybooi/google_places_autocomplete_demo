import { Button, Form, Input, Switch } from "antd";
import PlacesAutocomplete from "./components/googlePlacesAutocomplete";
import { LAYOUT, VALIDATE_MESSAGES } from "./components/utils";

const App = () => {
  const onFinish = (values: any) => console.log("LOG:::onFinish:", values);

  //#region PlacesAutocomplete events
  const onBlur = (e: any) => console.log("LOG:::onBlur:", e);

  const onCoordsChange = (lat: number, lng: number) =>
    console.log("LOG:::onCoordsChange:", lat, lng);

  const onKeyDown = (e: any) => console.log("LOG:::onKeyDown:", e);

  //#endregion

  return (
    <Form
      {...LAYOUT}
      name="nest-messages"
      onFinish={onFinish}
      validateMessages={VALIDATE_MESSAGES}
    >
      <Form.Item
        name={["user", "name"]}
        label="Name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={["user", "email"]}
        label="Email"
        rules={[{ type: "email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.isDisabled !== currentValues.isDisabled
        }
      >
        {({ getFieldValue }) => (
          <Form.Item name={["user", "address"]} label="Address">
            <PlacesAutocomplete
              isClearable
              isDisabled={getFieldValue("isDisabled")}
              placeholder="Search Address"
              onBlur={onBlur}
              onCoordsChange={onCoordsChange}
              onKeyDown={onKeyDown}
            />
          </Form.Item>
        )}
      </Form.Item>

      <Form.Item name={"isDisabled"} label="Disable" valuePropName="checked">
        <Switch />
      </Form.Item>

      <Form.Item wrapperCol={{ ...LAYOUT.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;
