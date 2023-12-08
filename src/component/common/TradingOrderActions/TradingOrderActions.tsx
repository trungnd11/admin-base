import { CheckCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import { TradingOrderActionsStyle } from "./TradingOrderActionsStyle";
import { ITradingOrderActionsModel } from "../../../model/balanceImpactModel/BalanceImpactModel";

const TradingOrderActions = (props: ITradingOrderActionsModel) => {
  const { onSubmit, onModify, onDelete, disabled } = props;

  return (
      <TradingOrderActionsStyle>
         <Tooltip title="Gửi duyệt">
            <Button type="text" disabled={disabled} onClick={onSubmit} icon={<CheckCircleOutlined />} />
         </Tooltip>

         <Tooltip title="Sửa">
            <Button type="text" disabled={disabled} onClick={onModify} icon={<EditOutlined />} />
         </Tooltip>

         <Tooltip title="Xóa">
            <Button type="text" disabled={disabled} onClick={onDelete} icon={<DeleteOutlined />} />
         </Tooltip>
      </TradingOrderActionsStyle>
  );
};

export default TradingOrderActions;
