import "../styles/style.css";
import React, {  useState } from "react";
import  Axios from 'axios';
import { Modal, ModalHeader,ModalBody,Row,Col} from "reactstrap";
import Swal from 'sweetalert2'

const Habit = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  const [newId,newSetId] = useState(0);
  
  const [newtitle, setnewTitle] = useState(0);


  const [modal,setmodal] = useState(false);
  
  const [modal2,setmodal2] = useState(false);
  



  Axios.get('http://localhost:3003/gethabit').then((response)  => {
    setData(response.data);
});


  const inserthabit = () => {
    Swal.fire({
      title: "สำเร็จ",
      text: "เพิ่มข้อมูลสำเร็จ",
      icon: "success",
      confirmButtonText: "สำเร็จ",
    });
    Axios.post("http://localhost:3003/inserthabit", {
      title:title,
    }).then(()  => {
      setData([...data, //เพื่อเก็บข้อมูลตัวเก่าไว้ด้วยถ้ามีการเพิ่มตัวใหม่เข้ามา
    {
      title:title,
    },
     ]);
  });
  };


const updatehabit = (id) => {
  Swal.fire({
    title: "สำเร็จ",
    text: "แก้ไขข้อมูลสำเร็จ",
    icon: "success",
    confirmButtonText: "สำเร็จ",
  });
  console.log(id)
  Axios.put("http://localhost:3003/updatehabit", {title: newtitle , id: id }).then(
    (response) => {
      setData(
        data.map((val) => {
          return val.id === id ? {
            id: val.id,
            title: newtitle ,
              }
            : val;
        })
      );
    }
  );
};



function ClickEditData(id){
  setmodal2(true)
  newSetId(id)
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
                                         placeholder=''
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
            <button  type="button" className="btn btn-success" onClick={()=>setmodal(true)}>เพิ่ม</button></span>
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
            <span id="boot-icon" className="btn btn-primary"  onClick={()=>{ClickEditData(val.habit_id)}}><span class="bi bi-pencil-square"></span></span>
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







