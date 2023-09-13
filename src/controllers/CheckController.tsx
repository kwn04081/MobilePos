import axios from 'axios';

export const checkEmail = async (email : string ) : Promise<any> => {
    try {
      const response = await axios.post('/check/email',null,{params:email});
      console.log(`server response :${response.data}`);
      return response.data;
    } catch (error : any) {
      console.error(error);
    }
  };

  export const checkNickName = async (nickname: string): Promise<string> => {
    try {
      const response = await axios.post('/check/nickname', null, { params: { nickname } });
      console.log(`server response: ${response.data}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error('중복 확인 중 오류가 발생했습니다.');
    }
  };

  export const checkPhoneNumber = async (email : string ) : Promise<any> => {
    try {
      const response = await axios.post('/check/phone-number',null,{params:email});
      console.log(`server response :${response.data}`);
      return response.data;
    } catch (error : any) {
      console.error(error);
    }
  };