import "../styles/style.css";
import React, {  useState } from "react";
import  Axios from 'axios';
import { Modal, ModalHeader,ModalBody,Row,Col} from "reactstrap";
import Swal from 'sweetalert2'
const Admin = () => {
  
  const [data, setData] = useState([]);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  
  const [newId,newSetId] = useState(0);
  
  const [newusername, setnewusername] = useState("");
  const [newpassword, setnewPassword] = useState("");

  const [modal,setmodal] = useState(false);
  
  const [modal2,setmodal2] = useState(false);

  const [selectedUsername, setSelectedUsername] = useState("");
  
  const [selectedPassword, setSelectedPassword] = useState("");
  
  Axios.get('http://localhost:3003/getadmin').then((response)  => {
    setData(response.data);

});


  const insertadmin = () => {
    for( let i =0;i< data.length;i++){
      let result = data[i].username.localeCompare(username);
      if(result===0)
      {
        Swal.fire({
          title: "เพิ่มข้อมูลไม่สำเร็จ",
          text: "ข้อมูลซ้ำ",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
        break;
      }
      if(i===(data.length-1)&&username!==''&&password !== ""&&result!==0)
      {
          Axios.post("http://localhost:3003/insertadmin",
          {
            username:username,
            password:password,
          }).then(()  => {
            Swal.fire({
              title: "สำเร็จ",
              text: "เพิ่มข้อมูลสำเร็จ",
              icon: "success",
              confirmButtonText: "ตกลง",
            });
            setData([...data, //เพื่อเก็บข้อมูลตัวเก่าไว้ด้วยถ้ามีการเพิ่มตัวใหม่เข้ามา
          {
            username:username,
            password:password,
          },
          ]);
        });
      }
      else if(username===''){
        Swal.fire({
          title: "ไม่สำเร็จ",
          text: "กรุณากรอกข้อมูลผู้ใช้งาน",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
      else if(password === ""){
        Swal.fire({
          title: "ไม่สำเร็จ",
          text: "กรุณากรอกรหัสผ่าน",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
    }

  };

const deleteadmin = (id) => {
  Axios.delete(`http://localhost:3003/deleteadmin/${id}`).then((response) => {
    setData(
      data.filter((val) => {
        return val.id !== id;
      })
    );
  });
  console.log(id)
  Swal.fire({
    title: "สำเร็จ",
    text: "ลบข้อมูลสำเร็จ",
    icon: "success",
    confirmButtonText: "ตกลง",
  });
};




const updateadmin = (id) => {
  for( let i =0;i< data.length;i++){
    let result = data[i].username.localeCompare(newusername);
    if(result===0)
    {
      setnewusername('');
      Swal.fire({
        title: "แก้ไขข้อมูลไม่สำเร็จ",
        text: "ข้อมูลซ้ำ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      break;
    }
    else if(i===(data.length-1)&&newusername !== ""&&newpassword !== ""&&result!==0)
    {
      
      Swal.fire({
        title: "สำเร็จ",
        text: "แก้ไขข้อมูลสำเร็จ",
        icon: "success",
        confirmButtonText: "ตกลง",
      });
        Axios.put("http://localhost:3003/updateadmin", {username : newusername , password: newpassword, id: id })
        break;
      }
      else if(newusername ===""){
        Swal.fire({
          title: "ไม่สำเร็จ",
          text: "กรุณากรอกข้อมูลผู้ใช้งาน",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
      else if(newpassword === ""){
        Swal.fire({
          title: "ไม่สำเร็จ",
          text: "กรุณากรอกข้อมูลรหัสผ่าน",
          icon: "error",
          confirmButtonText: "ตกลง",
        });
      }
      }
    };

function ClickEditData(id,username,password){
  setSelectedUsername(username);
  setSelectedPassword(password);
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
                    เพิ่มรายละเอียดเจ้าหน้าที่
                </ModalHeader>
               <ModalBody>
                    <form>
                        <Row>
                            <Col lg={12}>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namesci'>
                                        ผู้ใช้งาน
                                    </label>
                                         <input
                                         type="text"
                                         className='form-control'
                                         placeholder='ผู้ใช้งาน'
                                          onChange={(event) => {
                                         setusername(event.target.value)
                                        }}
                                        
                                         />                 
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namelocal'>
                                        รหัสผ่าน
                                    </label>
                                         <input
                                         type="text"
                                         className='form-control'
                                         placeholder='รหัสผ่าน'
                                         onChange={(event) => {
                                         setPassword(event.target.value)
                                        }}                       
                                         />
                                </div>
                                <button type="button" onClick={insertadmin} className="btn btn-warning">เพิ่มข้อมูล</button>
                            </Col>                            
                        </Row>
                    </form>
               </ModalBody>
  </Modal>

  <div className="sell__car">
    <div className="container-fluid">
      <div className="row">
            <h2>ข้อมูลเจ้าหน้าที่</h2><span>
            <button  type="button" className="btn btn-success" onClick={()=>setmodal(true)}><span class="bi bi-plus">เพิ่ม</span></button></span>
      <div className="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr>
              <th>ชื่อผู้ใช้</th>
              <th>รหัสผ่าน</th>
              <th>จัดการข้อมูล</th>
            </tr>
          </thead>
       {data.map((val,key) => {
          return(
          <tbody id="admin_list">
            <tr>
              <td>{val.username}</td>
              <td>{val.password}</td>
         <div>  
            <span id="boot-icon" className="btn btn-primary"  onClick={()=>{ClickEditData(val.id,val.username,val.password)}}><span class="bi bi-pencil-square"> แก้ไข</span></span>
            <button type="button" className="btn btn-danger" onClick={() => {deleteadmin(val.id)}}><span class="bi bi-trash-fill"> ลบ</span></button></div>
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
              <ModalHeader    toggle={() => setmodal2(!modal2)} >แก้ไขรายละเอียดเจ้าหน้าที่</ModalHeader>
               <ModalBody>
                    <form>
                        <Row>
                            <Col lg={12}>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namesci'>
                                    ผู้ใช้งาน
                                    </label>
                                         <input
                                         type="text"
                                         className='form-control'
                                         placeholder='ผู้ใช้งาน'
                                         defaultValue={selectedUsername}
                                          onChange={(event) => {
                                            setnewusername(event.target.value)
                                        }}
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namelocal'>
                                        รหัสผ่าน
                                    </label>
                                         <input
                                         type="text"
                                         className='form-control'
                                         placeholder='รหัสผ่าน'
                                         defaultValue={selectedPassword}
                                             onChange={(event) => {
                                              setnewPassword(event.target.value)
                                        }}                            
                                         />
                                </div>      
                                <button type="button" onClick={() => {updateadmin(newId)}} className="btn btn-warning"> แก้ไขข้อมูล </button>                                          
                            </Col>   
                        </Row>                        
                    </form>
               </ModalBody>        
            </Modal> 
    </>
  );
};
export default Admin;
