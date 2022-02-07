const getCookie =(name)=>{
    //가져오기
    let value = "; "+document.cookie;

    let parts = value.split(`; ${name}=`); //; user_id =

    //이해가 안가요
    if(parts.length===2){
        return parts.pop().split(";").shift();
    }
}

//로그인 페이지에서 가저온 값들 name, value, exp
const setCookie =(name, value, exp=5)=>{

    let date = new Date();
    date.setTime(date.getTime()+ exp*24*60*60*1000)
    
    document.cookie=`${name}=${value}; expires = ${date.toUTCString()}`;
}

const deleteCookie =(name)=>{
    let date = new Date("2020-01-01").toUTCString();
    console.log(date);

    document.cookie = name+"=; expires ="+ date;
}

export {getCookie, setCookie,deleteCookie};