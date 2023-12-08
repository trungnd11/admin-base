import AppDatePicker from "../../component/appDatePicker/AppDatePicker";
import AppSelect from "../../component/appSelect/AppSelect";
import { ISystemDebtSearchFormModel } from "../../model/systemdebts/SystemDebts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { TypeConfig } from "../../model/configDataModel/ConfigDataModel";
import FormSearchCommon from "../../component/form/formSearchCommon/FormSearchCommon";
import { getToDay, getBeforeDateByCurrentDate } from "../../ulti/dateUlti";
import { OptionsFormType } from "../../model/components/FormSearchCommonModel";
import { SystemDebtListDetail } from "./SystemDebtListDetail";

export const SystemDebtFormSearch = (props: ISystemDebtSearchFormModel) => {
  const {
    title,
    onSubmit,
    exportExcel,
    exportDisable,
    exportLoading,
    resetField,
    systemDebtsSchema,
    dataStatics,
    isFetching,
    dataDebts,
    searchParams,
    isLoading,
    dataDetail,
    detailDebt,
    setDetailDebt,
    setSearchParams,
    setIsSearch,
    isSearch,
    isDetail = false
  } = props;
  const { pathname } = useLocation();
  const [dataSelect, setDataSelect] = useState<keyof TypeConfig>();

  const options: OptionsFormType[] = [
    {
      component: AppSelect,
      field: "masterAccountId",
      label: title,
      typeSelectAsync: dataSelect,
      addAll: !isDetail,
      customOptionValue: [{ code: "NAPAS", value: "-1" }],
      layout: {
        xxl: 6
      }
    },
    {
      component: AppDatePicker,
      field: "fromDate",
      label: "Từ ngày",
      layout: {
        xxl: 6
      }
    },
    {
      component: AppDatePicker,
      field: "toDate",
      label: "Đến ngày",
      layout: {
        xxl: 6
      },
      dependentField: ["fromDate", "toDate"]
    }
  ];

  useEffect(() => {
    if (pathname === "/bank-debts") {
      isDetail ? setDataSelect("debtBank") : setDataSelect("bankList");
    } else {
      isDetail ? setDataSelect("debtMerchant") : setDataSelect("allMerchant");
    }
  }, [pathname]);

  return (
    <>
      <FormSearchCommon
        formItem
        labelBtnSubmit="Tìm kiếm"
        typeIconBtnSubmit="search"
        layoutCommon={{ xs: 24, sm: 24, md: 12, lg: 12, xl: 8, xxl: 6 }}
        layoutWrapperButton={{ xs: 24, sm: 24, md: 12, lg: 12, xl: 24, xxl: 6 }}
        initValueForm={{ masterAccountId: "", toDate: getToDay(), fromDate: getBeforeDateByCurrentDate({ number: 6 }) }}
        options={options}
        schema={systemDebtsSchema}
        onHandleSubmit={(value) => onSubmit && onSubmit(value)}
        isShowBtnExport
        disableBtnExport={exportDisable}
        onExport={exportExcel}
        loadingBtnSearch={exportLoading}
        resetField={resetField}
      >
        <SystemDebtListDetail
          dataStatics={dataStatics}
          isFetching={isFetching}
          dataDebts={dataDebts}
          searchParams={searchParams}
          isLoading={isLoading}
          dataDetail={dataDetail}
          detailDebt={detailDebt}
          setDetailDebt={setDetailDebt}
          setSearchParams={setSearchParams}
          setIsSearch={setIsSearch}
          isSearch={isSearch}
          isDetail={isDetail}
        />
      </FormSearchCommon>
    </>
  );
};
