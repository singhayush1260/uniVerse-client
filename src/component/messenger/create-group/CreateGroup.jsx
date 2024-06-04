import classes from "./CreateGroup.module.scss";
import {CiUser} from "react-icons/ci"
import ReactSelect from "react-select";
const CreateGroup=()=>{
return(
    <div className={classes.create_group}>
     <h4>Create Group</h4>
     <div className={`${classes.field_group_one}`}>
        <div className={classes.input_controller}>
          <CiUser />
          <input
            type="text"
            id="Name"
            name="Name"
            placeholder="Name"
          />
            <div className={""}>
            <ReactSelect 
            isDisabled={false}
            styles={{option: (provided, state) => ({
              ...provided,
              color: state.isSelected ? 'white' : 'blue',
              padding: 5,
            })}}
            options={[{value:1,label:"Ayush"},{value:2,label:"Neeraj"}]}
            isMulti 
            onChange={(value)=>setValue("members",value)}
            />
            </div>
           
        </div>
      </div>
    </div>
)
}
export default CreateGroup;