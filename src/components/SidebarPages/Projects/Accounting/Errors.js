import { Alert } from "antd";
import "antd/dist/antd.css";

export function ErrorComponent() {
  return (
    <Alert
      message="Data Selection and Printing Error"
      description="There is an error with your selection data | ERROR 400 (BAD REQUEST)"
      type="error"
      closable
    />
  );
}
