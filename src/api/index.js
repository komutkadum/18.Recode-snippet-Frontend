import Swal from 'sweetalert2';
import axios from 'axios';
import {snippetRoute} from '../api/apiRoutes'

export const deleteSnippet = (id,title,index,snippetData,setSnippetData) => {
    Swal.fire({
        title : "Delete",
        icon : "info",
        text : title,
        showCancelButton:true,
        confirmButtonText:"Confirm",
        preConfirm : async()=>{
            return await axios.delete(`${snippetRoute}/${id}`)
            .then(res=>{
                return res;
            }).catch(err=>{
                Swal.showValidationMessage(`Request failed: ${err}`)
            })
        },
        showLoaderOnConfirm : true
    }).then(res=>{
        if(res.isConfirmed&&res.value){
            const arr = [...snippetData];
            arr.splice(index, 1);
            setSnippetData(arr);
            Swal.fire({
                title : "Delete Successful",
                icon:"success"
            })
        }
    })
}

export const updateSnippet = (title,codeAce,tags,languageValue,history,query,type) =>{
    if(title===""||codeAce===""||tags===""||languageValue===""){
        Swal.fire({
            title:"Missing values",
            icon:"warning",
            text:"You have some missing values in your input!",
        })
        return;
    }
    // for update
    let url = `${snippetRoute}/${query.get('id')}`;
    let method="PUT";
    // for submit
    if(type==="submit"){
        url = snippetRoute;
        method = "POST"
    }
    Swal.fire({
        title:type==="submit"?"Snippet Send":"Snipet Update",
        icon:"question",
        text:type==="submit"?"Do you want to submit snippet?":"Do you want to update snippet",
        confirmButtonText:"confirm",
        confirmButtonColor:"green",  
        cancelButtonText:"cancel",
        showCancelButton:true,
        preConfirm : async()=>{
            return await axios({
                method : method,
                url : url,
                data : {
                    userId : localStorage.getItem('userid'),
                    title :title,
                    tags : tags,
                    snippet: codeAce,
                    language : languageValue
                }
            }).then((res)=>{
                return res.data;   
            }).catch(error=>{
                Swal.showValidationMessage(`Request failed: ${error}`)
            })
        },
        showLoaderOnConfirm:true,
        allowOutsideClick: () => !Swal.isLoading()
    }).then(res=>{
        if(res.isConfirmed&&res.value.message==='success'){
            Swal.fire({
                title : "Snippet Saved Successfull",
                icon: "success"
            })
            history.push('/snippet')
        }else {
            Swal.fire({
                title : "Snippet Saved Unsuccessful",
                icon: "error"
            })
        }
    })

}