import "../styles/style.css";
import React, {  useState } from "react";
import  Axios from 'axios';
import { Modal, ModalHeader,ModalBody,Row,Col} from "reactstrap";
import Swal from 'sweetalert2'

const Habit = () => {

  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  const [newId,newSetId] = useState(0);
  
  const [newtitle, setnewTitle] = useState("");

  const [modal,setmodal] = useState(false);
  
  const [modal2,setmodal2] = useState(false);

  const [selectedHabitTitle, setSelectedHabitTitle] = useState("");
  



  Axios.get('http://localhost:3003/gethabit').then((response)  => {
    setData(response.data);
});


  const inserthabit = () => {
    for( let i =0;i< data.length;i++){
      let result = data[i].habit_title.localeCompare(title);
      if(result===0)
      {
        Swal.fire({
          title: "เพิ่มข้อมูลไม่สำเร็จ",
          text: "ข้อมูลซ้ำ",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        setTitle("");
        break;
      }
        if(i===(data.length-1)&&title!==''&&result!==0)
        {
          Axios.post("http://localhost:3003/inserthabit", {
            title:title,
          }).then(()  => {
            Swal.fire({
              title: "สำเร็จ",
              text: "เพิ่มข้อมูลสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
            });
            setTitle("");
            setData([...data, //เพื่อเก็บข้อมูลตัวเก่าไว้ด้วยถ้ามีการเพิ่มตัวใหม่เข้ามา
          {
            title:title,
          },
          ]);
        });
        }
        else if(i===(data.length-1) && title===''){
          Swal.fire({
            title: "ไม่สำเร็จ",
            text: "เพิ่มข้อมูลไม่สำเร็จ",
            icon: "error",
            confirmButtonText: "ตกลง",
          });
        }
      }
  };


const updatehabit = (id) => {
  for( let i =0;i< data.length;i++){
    let result = data[i].habit_title.localeCompare(newtitle);
    if(result===0)
    {
      Swal.fire({
        title: "แก้ไขข้อมูลไม่สำเร็จ",
        text: "ข้อมูลซ้ำ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      break;
    }
   if(i===(data.length-1)&&newtitle !== ""&&result!==0) // else
  {
    Swal.fire({
      title: "สำเร็จ",
      text: "แก้ไขข้อมูลสำเร็จ",
      icon: "success",
      confirmButtonText: "ตกลง",
    });
    Axios.put("http://localhost:3003/updatehabit", {title: newtitle , id: id })
    setnewTitle('');
    break;
  }
  else if(i===(data.length-1) && newtitle ==="" ){
    Swal.fire({
      title: "ไม่สำเร็จ",
      text: "แก้ไขข้อมูลไม่สำเร็จ",
      icon: "error",
      confirmButtonText: "ตกลง",
    });
  }
  }
};




function ClickEditData(id,title){
  setSelectedHabitTitle(title);
  setnewTitle(title);
  setmodal2(true);
  newSetId(id);
}



  return (
    <>
    <Modal
            size='lg'
            isOpen={modal}
            backdrop="static"
            toggle={() => setmodal(!modal)}
            >
    <ModalHeader
                    toggle={() => setmodal(!modal)}
                >
                    เพิ่มลักษณะวิสัย
                </ModalHeader>
               <ModalBody>
                    <form>
                        <Row>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namelocal'>
                                        ลักษณะวิสัย
                                    </label>
                                         <input
                                         type="text"
                                         className='form-control'
                                         placeholder='ลักษณะวิสัย'
                                         onChange={(event) => {
                                          setTitle(event.target.value)
                                        }}                            
                                         />
                                </div>
                                <button type="button" onClick={inserthabit} className="btn btn-warning">เพิ่มข้อมูล</button>
                            </Col>                            
                        </Row>
                    </form>
               </ModalBody>
  </Modal>

  <div className="sell__car">
    <div className="container-fluid">
      <div className="row">
            <h2>ลักษณะวิสัย</h2><span>
            <button  type="button" className="btn btn-success" onClick={()=>setmodal(true)}><span class="bi bi-plus">เพิ่ม</span></button></span>
      <div className="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>จัดการข้อมูล</th>
            </tr>
          </thead>
       {data.map((val,key) => {
          return(
          <tbody id="admin_list">
            <tr>
              <td>{val.habit_title}</td>
         <div>    
            <span id="boot-icon" className="btn btn-primary"  onClick={()=>{ClickEditData(val.habit_id,val.habit_title)}}><span class="bi bi-pencil-square"> แก้ไข</span></span>
            </div>
            </tr>
          </tbody>
          );
         })}
        </table>
      </div>
    </div>
  </div>
</div>
<Modal size='lg'    backdrop="static" isOpen={modal2} toggle={() => setmodal2(!modal2)} >
              <ModalHeader    toggle={() => setmodal2(!modal2)} > แก้ไขลักษณะวิสัย    </ModalHeader>
               <ModalBody>
                    <form>
                        <Row>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namelocal'>
                                        ชื่อ
                                    </label>
                                         <input
                                         type="text"
                                         className='form-control'
                                         defaultValue={selectedHabitTitle}
                                         placeholder='ลักษณะวิสัย'
                                             onChange={(event) => {
                                              setnewTitle(event.target.value)
                                        }}                           
                                         />
                                </div>      
                                <button type="button" onClick={() => {updatehabit(newId)}} className="btn btn-warning"> แก้ไขข้อมูล </button>                                          
                            </Col>   
                        </Row>                        
                    </form>
               </ModalBody>        
        </Modal>
    </>
  );
};
export default Habit;







