import classes from "./SearchDialog.module.scss";
import Modal from "../../modal/Modal";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useState } from "react";

const SearchDialog = ({ dialogLabel, data, showDialog, setShowDialog }) => {

const[dataset, setDataset]=useState(data);  

const[tempDataset, setTempDataset]=useState(data);

const[searchQuery, setSearchQuery]=useState("");

console.log(searchQuery);

const searchInDataset = (e) => {
  const query = e.target.value.toLowerCase();
  setSearchQuery(query);

  const filteredDataset = dataset.filter((item) => {
    return (
      item.name.toLowerCase().includes(query) ||
      item.userId.toLowerCase().includes(query)
    );
  });

  setTempDataset(filteredDataset);
};

  return (
    <Modal isOpened={showDialog}>
      <div className={classes.search_dialog_wrapper}>
        <div className={classes.header}>
          <h1>{dialogLabel}</h1>
          <IoCloseCircleOutline onClick={() => setShowDialog(false)} />
        </div>
        <div className={classes.input_controller}>
          <input type="text" placeholder="Search friend here..." autoFocus onChange={(e)=>searchInDataset(e)} />
        </div>
        <div className={classes.list}>
          {tempDataset.length<1 && <span>0 result found</span>}
          { tempDataset.length >0 && tempDataset.map((data) => {
            return (
              <div className={classes.list_item} key={data.userId}>
                <div className={classes.image_container}>
                  <img src={data.profile_picture} alt={data.name} />
                </div>
                <div className={classes.list_item_detail}>
                  <span>{data.name}</span>
                  <span>{data.userId}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};
export default SearchDialog;
