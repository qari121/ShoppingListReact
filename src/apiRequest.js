const apiRequest= async (url='', optionsObj=null, errMsg=null)=>{
    try{
        const request=await fetch(url,optionsObj)
        if(!request.ok)throw Error('Please Reload App')

    }catch (e){
        errMsg=e.message
    }finally{
        return errMsg
    }
}

export default apiRequest ;