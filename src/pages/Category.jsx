import "../styles/style.css";
import React, {  useState } from "react";
import  Axios from 'axios';
import { Modal, ModalHeader,ModalBody,Row,Col} from "reactstrap";
import Swal from 'sweetalert2'


const Category = () => {
  const [data, setData] = React.useState([]);
  const [title, setTitle] = useState("");

  const [newId,newSetId] = useState(0);
  
  const [newtitle, setnewTitle] = useState("");


  const [modal,setmodal] = useState(false);
  
  const [modal2,setmodal2] = useState(false);
  
  const [selectedCateTitle, setSelectedCateTitle] = useState("");
  



  
  Axios.get('http://localhost:3003/getcategory').then((response)  => {
    setData(response.data);

});


  const insertcate = () => {

    for( let i =0;i< data.length;i++){
      let result = data[i].cat_title.localeCompare(title);
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
      if(i===(data.length-1)&&title!==''&&result!==0)
      {
        Axios.post("http://localhost:3003/insertcategory", {
          title:title,
        }).then(()  => {
          Swal.fire({
            title: "สำเร็จ",
            text: "เพิ่มข้อมูลสำเร็จ",
            icon: "success",
            confirmButtonText: "ตกลง",
          });
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


const updatecate = (id) => {
  for( let i =0;i< data.length;i++){
    let result = data[i].cat_title.localeCompare(newtitle);
    console.log(data[i].cat_title)
    if(result===0)
    {
      console.log(newtitle)
      Swal.fire({
        title: "แก้ไขข้อมูลไม่สำเร็จ",
        text: "ข้อมูลซ้ำ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      break;
    }
  else if(i===(data.length-1)&&newtitle !== ""&&result!==0)
  {
    
    Swal.fire({
      title: "สำเร็จ",
      text: "แก้ไขข้อมูลสำเร็จ",
      icon: "success",
      confirmButtonText: "ตกลง",
    });
    Axios.put("http://localhost:3003/updatecate", {title: newtitle , id: id })
    setnewTitle("");
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
  setSelectedCateTitle(title);
  setnewTitle(title);
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
                    เพิ่มประเภท
                </ModalHeader>
               <ModalBody>
                    <form>
                        <Row>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namelocal'>
                                        ชื่อประเภท
                                    </label>
                                         <input
                                         type="text"
                                         className='form-control'
                                         placeholder='ชื่อ'
                                         onChange={(event) => {
                                          setTitle(event.target.value)
                                        }}                          
                                         />
                                </div>
                                <button type="button" onClick={insertcate} className="btn btn-warning">เพิ่มประเภท</button>
                            </Col>                            
                        </Row>
                    </form>
               </ModalBody>
  </Modal>
  <div className="sell__car">
    <div className="container-fluid">
      <div className="row">
            <h2>ประเภท</h2><span>
            <button  type="button" className="btn btn-success" onClick={()=>setmodal(true)}><span class="bi bi-plus">เพิ่ม</span></button></span>
            
      <div className="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr >
              <th>ชื่อ</th>
              <th>จัดการข้อมูล</th>
            </tr>
          </thead>
       {data.map((val,key) => {
          return(
          <tbody id="admin_list">
            <tr>
              <td>{val.cat_title}</td>
         <div className="action">    
            <span id="boot-icon" className="btn btn-primary"  onClick={()=>{ClickEditData(val.cat_id,val.cat_title)}}><span class="bi bi-pencil-square"> แก้ไข</span></span>
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
              <ModalHeader    toggle={() => setmodal2(!modal2)} >แก้ไขประเภท</ModalHeader>
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
                                         placeholder='ชื่อประเภท'
                                         defaultValue={selectedCateTitle}
                                             onChange={(event) => {
                                              setnewTitle(event.target.value)
                                        }}                            
                                         />
                                </div>      
                                <button type="button" onClick={() => {updatecate(newId)}} className="btn btn-warning">แก้ไขข้อมูล</button>                                          
                            </Col>   
                        </Row>                        
                    </form>
               </ModalBody>        
            </Modal>
    </>
  );
};
export default Category;







