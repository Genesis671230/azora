import DealsAdd from "components/ui/DealsComponents/DealsAdd";
import DealsGridTable from "components/ui/DealsComponents/DealsGridTable";
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteDealAsync, getSelectedDealsId, selectDeals } from "./dealSlice";
const Deals = () => {
  const dispatch = useDispatch();
  const dealsList = useSelector(selectDeals);
  const selectedDealsId = useSelector(getSelectedDealsId);

  const handleDelete = () => {
    if (selectedDealsId.length > 0) {
      dispatch(deleteDealAsync());
    } else {
      console.log("No deals selected for deletion");
    }
  };

  return (
    <>
      <div>
        <div className="my-2 w-full overscroll-auto flex justify-end">
          <div className="flex mr-2 w-9 h-10 justify-center items-end">
            {selectedDealsId.length > 0 && (
              <AiOutlineDelete
                onClick={handleDelete}
                className="text-red-700 w-9 shadow-md hover:scale-110 cursor-pointer h-9 text-center"
              />
            )}
          </div>
          <DealsAdd />
        </div>
        <div className="overflow-auto ">
          <DealsGridTable dealsList={dealsList} />
          {/* <GridExample revenueReports={invoicesList}/> */}
          {/* <DealsTable dealsList={dealsList} /> */}
        </div>
      </div>
    </>
  );
};

export default Deals;
