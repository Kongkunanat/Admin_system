import "../styles/style.css";
import React, {  useState  } from "react";
import  Axios from 'axios';
import { Modal, ModalHeader,ModalBody,Row,Col} from "reactstrap";
import Swal from "sweetalert2";



const Data = () =>  {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const [gethabit, setgetHabit] = useState([]);



  let   [catid, setCatid] = useState();
  const [title, setTitle] = useState("");
  const [sciname, setSciname] = useState("");
  const [Common, setCommon] = useState("");
  const [imagefile, setImagefile] = useState(null);
  const [desc, setDesc] = useState("");
  const [benefit, setBenefit] = useState("");
  let   [habit, setHabit] = useState([]);



  let   [newcatid, setnewCatid] = useState("");
  const [newtitle, setnewTitle] = useState("");
  const [newsciname, setnewSciname] = useState("");
  const [newCommon, setnewCommon] = useState("");
  const [newimagefile, setnewImagefile] = useState(null);
  const [newdesc, setnewDesc] = useState("");
  const [newbenefit, setnewBenefit] = useState("");
  let   [newhabit, setnewHabit] = useState("");

  
  const [newId,newSetId] = useState(0);
  
  const [modal,setmodal] = useState(false);
  
  const [modal2,setmodal2] = useState(false);
  
  




Axios.get('http://localhost:3003/getcategory').then((response)  => {
  setCategory(response.data);
});



  Axios.get('http://localhost:3003/getdata').then((response)  => {
    setData(response.data);

});



Axios.get('http://localhost:3003/gethabit').then((response)  => {
  setgetHabit(response.data);

});



const handleFileChange2 = (event) => {
  setnewImagefile(event.target.files[0]);
};


const handleSubmit2 = async (event) => {
  event.preventDefault();
  Swal.fire({
    title: "สำเร็จ",
    text: "แก้ไขข้อมูลสำเร็จ",
    icon: "success",
    confirmButtonText: "สำเร็จ",
  });
  for( let i =0;i< category.length;i++){
    let result = category[i].cat_title.localeCompare(newcatid);
    if(result===0)
    {
     newcatid=category[i].cat_id;

     break;
    }
    else{
     console.log("no");
    }
  }

  for( let i =0;i< gethabit.length;i++){
   let result = gethabit[i].habit_title.localeCompare(newhabit);
   if(result===0)
   {
     
    newhabit=gethabit[i].habit_id;
    break;
   }
   else{
    console.log("no");
   }
 }
    let formData = new FormData();
    formData.append('newcatid', newcatid);
    formData.append('newtitle',newtitle);
    formData.append('newsciname', newsciname);
    formData.append('newCommon', newCommon);
    formData.append('avatar', newimagefile);
    formData.append('newdesc', newdesc);
    formData.append('newbenefit', newbenefit);
    formData.append('newhabit', newhabit);
    await Axios.put(`http://localhost:3003/updatedata/${newId}`, formData);
        setnewCatid('');
        setnewTitle('');
        setnewSciname('');
        setnewCommon ('');
        setnewImagefile(null);
        setnewDesc('');
        setnewBenefit('');
        setnewHabit('');
    
};



const handleFileChange = (event) => {
  setImagefile(event.target.files[0]);
};



function ClickEditData(id){
  setmodal2(true)
  newSetId(id)
}





const handleSubmit = async (event) => {
  event.preventDefault();
   for( let i =0;i< category.length;i++){
     let result = category[i].cat_title.localeCompare(catid);
     if(result===0)
     {
      catid=category[i].cat_id;
      break;
     }
     else{
      console.log("error");
     }
   }

   for( let i =0;i< gethabit.length;i++){
    let result = gethabit[i].habit_title.localeCompare(habit);
    if(result===0)
    {
     habit=gethabit[i].habit_id;
     break;
    }
    else{
     console.log("error");
    }
  }



  for( let i =0;i< data.length;i++){
    let result = data[i].forest_title.localeCompare(title);
    if(result===0)
    {
      setCatid('');
      setTitle('');
      setSciname('');
      setCommon('');
      setImagefile(null);
      setDesc('');
      setBenefit('');
      setHabit('');
      Swal.fire({
        title: "ไม่สำเร็จ",
        text: "ข้อมูลซ้ำ",
        icon: "error",
        confirmButtonText: "ตกลง",
      });
      break;
    }
    else if(i===(data.length-1)&&result!==0){
      console.log("เพิ่มได้");
    let formData = new FormData();
    formData.append('catid', catid);
    formData.append('title',title);
    formData.append('sciname', sciname);
    formData.append('Common', Common);
    formData.append('image', imagefile);
    formData.append('desc', desc);
    formData.append('benefit', benefit);
    formData.append('habit', habit);
    Swal.fire({
      title: "สำเร็จ",
      text: "เพิ่มข้อมูลสำเร็จ",
      icon: "success",
      confirmButtonText: "ตกลง",
    });
    await Axios.post("http://localhost:3003/insertdata", formData);
    setCatid('');
    setTitle('');
    setSciname('');
    setCommon('');
    setImagefile('');
    setDesc('');
    setBenefit('');
    setHabit('');
    break;
    }
  }

};




const deletedata = (id) => {
  Axios.delete(`http://localhost:3003/deletedata/${id}`).then((response) => {
    setData(
      data.filter((val) => {
        return val.id !== id;
      })
    );
  });
  Swal.fire({
    title: "สำเร็จ",
    text: "ลบข้อมูลสำเร็จ",
    icon: "success",
    confirmButtonText: "สำเร็จ",
  });
};



return (
    <>
    <Modal
            size='lg'
            isOpen={modal}
            backdrop="static"
            toggle={() => setmodal(!modal)}
            >
    <ModalHeader toggle={() => setmodal(!modal)} >
      เพิ่มรายละเอียดพืช
                </ModalHeader>
               <ModalBody>
                    <form>
                        <Row>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                        ประเภท
                                    </label>
                                          <select
                                          class="form-control brand_list" name="e_brand_id"
                                            onChange={e => setCatid(e.target.value)}
                                          >
                                              {category.map((val,i) => {
                                              return(
                                              <option key={i}><td>{val.cat_title}</td></option>
                                              );
                                            })}
                                          </select>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                        ชื่อ
                                    </label>
                                         <input
                                         type="text"
                                         name="Title"
                                         className='form-control'
                                         placeholder='ชื่อ'
                                         value={title}
                                         onChange={event => setTitle(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                    ชื่อวิทยาศาสตร์
                                    </label>
                                         <input
                                         type="text"
                                         name="Sciname"
                                         className='form-control'
                                         placeholder='ชื่อวิทยาศาสตร์'
                                         value={sciname}
                                         onChange={event => setSciname(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                      ชื่อท้องถิ่น
                                    </label>
                                         <input
                                         type="text"
                                         name="Common"
                                         className='form-control'
                                         placeholder='ชื่อท้องถิ่น'
                                         value={Common}
                                         onChange={event => setCommon(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                      รูปภาพ <small>(format: jpg, jpeg, png)</small>
                                    </label>
                                    <input type="file" name="image"  onChange={handleFileChange} class="form-control" required/>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                      ลักษณะทั่วไป
                                    </label>
                                         <input
                                         type="text"
                                         name="desc"
                                         className='form-control'
                                         value={desc}
                                         placeholder=''
                                         onChange={event => setDesc(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                        ประโยชน์
                                    </label>
                                         <input
                                         type="text"
                                         name="benefit"
                                         className='form-control'
                                         placeholder=''
                                         value={benefit}
                                         onChange={event => setBenefit(event.target.value)}
                                         required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namelocal'>
                                        ลักษณะวิสัย
                                    </label>
                                    <select
                                          class="form-control brand_list" name="e_brand_id"
                                            onChange={e =>  setHabit(e.target.value)}
                                          >
                                              {gethabit.map((val,i) => {
                                              return(
                                              <option key={i}><td>{val.habit_title}</td></option>
                                              );
                                            })}
                                          </select>
                                </div>
                                <button type="button" onClick={handleSubmit} className="btn btn-warning" >เพิ่มข้อมูล </button>
                            </Col>                            
                        </Row>
                    </form>
               </ModalBody>
  </Modal>

  <div className="sell__car">
    <div className="container-fluid">
      <div className="row">
            <h2>พืช</h2><span>
            <button  type="button" className="btn btn-success" onClick={()=>setmodal(true)}>เพิ่ม</button></span>
      <div className="table-responsive">
        <table  class="table table-striped table-sm">
          <thead>
            <tr>
              <th>ชื่อ</th>
              <th>รูปภาพ</th>
              <th>ประเภท</th>
              <th>จัดการข้อมูล</th>
            </tr>
          </thead>
       {data.map((val,key) => {
          return(
          <tbody id="admin_list">
            <tr>
              <td>{val.forest_title}</td>
              <td>{val.forest_image &&<img  src={`http://localhost:3003/images/${val.forest_image}`} alt=" " style={{ width: '7rem' }}/>}</td>
              <td>{val.cat_title}</td>
          <div>   
            <span id="boot-icon" className="btn btn-primary"  onClick={()=>{ClickEditData(val.forest_id)}}><span class="bi bi-pencil-square"></span></span>
            <button type="button" className="btn btn-danger" onClick={() => {deletedata(val.forest_id)}}><span class="bi bi-trash-fill"></span></button></div>
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
              <ModalHeader    toggle={() => setmodal2(!modal2)} >  แก้ไขรายละเอียดพืช    </ModalHeader>
               <ModalBody>
                    <form>
                    <Row>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                        ประเภท
                                    </label>
                                    <select
                                          class="form-control brand_list" name="e_brand_id"
                                            onChange={e => setnewCatid(e.target.value)}
                                          >
                                              {category.map((val,i) => {
                                              return(
                                              <option key={i}><td>{val.cat_title}</td></option>
                                              );
                                            })}
                                          </select>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                        ชื่อ
                                    </label>
                                         <input
                                         type="text"
                                         name="Title"
                                         className='form-control'
                                         placeholder='ชื่อ'
                                         value={newtitle}
                                         onChange={event => setnewTitle(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                    ชื่อวิทยาศาสตร์
                                    </label>
                                         <input
                                         type="text"
                                         name="sciname"
                                         className='form-control'
                                         placeholder='ชื่อวิทยาศาสตร์'
                                         value={newsciname}
                                         onChange={event => setnewSciname(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                      ชื่อท้องถิ่น
                                    </label>
                                         <input
                                         type="text"
                                         name="Common"
                                         className='form-control'
                                         placeholder='ชื่อท้องถิ่น'
                                         value={newCommon}
                                         onChange={event => setnewCommon(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                      รูปภาพ <small>(format: jpg, jpeg, png)</small>
                                    </label>
                                    <input type="file" name="avatar"  onChange={handleFileChange2} class="form-control" required/>
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                      ลักษณะทั่วไป
                                    </label>
                                         <input
                                         type="text"
                                         name="desc"
                                         className='form-control'
                                         value={newdesc}
                                         placeholder=''
                                         onChange={event => setnewDesc(event.target.value)}
                                          required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='name'>
                                         ประโยชน์
                                    </label>
                                         <input
                                         type="text"
                                         name="benefit"
                                         className='form-control'
                                         placeholder=''
                                         value={newbenefit}
                                         onChange={event => setnewBenefit(event.target.value)}
                                         required
                                         />
                                </div>
                            </Col>
                            <Col lg={12}>
                                <div>
                                    <label htmlFor='namelocal'>
                                        ลักษณะวิสัย
                                    </label>
                                    <select
                                          class="form-control brand_list" name="e_brand_id"
                                            onChange={e => setnewHabit(e.target.value)}
                                          >
                                              {gethabit.map((val,i) => {
                                              return(
                                              <option key={i}><td>{val.habit_title}</td></option>
                                              );
                                            })}
                                          </select>
                                </div>     
                                <button type="button" onClick={handleSubmit2} className="btn btn-warning"> แก้ไขข้อมูล </button>                                          
                            </Col>   
                        </Row>                          
                    </form>
               </ModalBody>        
            </Modal>  
    </>
  );
};
export default Data;







