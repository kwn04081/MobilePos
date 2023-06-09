import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useNavigation, StackActions } from '@react-navigation/native';

const SignupScreen1 = ({navigation}) => {
    const [isCheckedList, setIsCheckedList] = useState([false, false, false, false, false]);

    const handleCheck = (index) => {
        const newList = [...isCheckedList];
        newList[index] = !isCheckedList[index];
        setIsCheckedList(newList);

        // 전체 동의 체크박스가 체크되어 있을 경우, 모든 체크박스를 체크하도록 처리
        if (index === 0 && newList[index]) {
            setIsCheckedList(newList.fill(true));
        }
        // 전체 동의 체크박스가 체크되어 있지 않을 경우, 모든 체크박스를 해제하도록 처리
        if (index === 0 && !newList[index]) {
            setIsCheckedList(newList.fill(false));
        }
    };

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>

        <Text style={{flexDirection: 'row', marginLeft: 40, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[0]}
                  onValueChange={() => handleCheck(0)} />
            <Text style={styles.mainText}>전체 동의</Text>
        </Text>

        <View>
        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[1]}
                  onValueChange={() => handleCheck(1)} />
            <TouchableOpacity onPress={toggleModal}><Text style={StyleSheet.flatten([styles.mainText, {textDecorationLine: 'underline'}])}>이용약관 동의(필수)</Text></TouchableOpacity>
        </Text>
        <Modal visible={modalVisible}
               animationType="slide"
               onRequestClose={() => {
                setModalVisible(false);
               }}
               transparent={true}>
            <View style={styles.modal}>
            <Text style={styles.modalText}>MobilePos 이용약관 동의{'\n'}{'\n'}이 앱의 사용자는 이용약관에 동의해야 앱을 사용하실 수 있습니다....</Text>
            <TouchableOpacity style={styles.modalButton}
                              onPress={() => {
                                setModalVisible(false);
                              }}>
            <Text style={styles.buttonText}>닫기</Text>
          </TouchableOpacity>
        </View>
      </Modal>
        </View>

        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[2]}
                  onValueChange={() => handleCheck(2)} />
            <Text style={styles.mainText}>전자금융거래 이용약관 동의(필수)</Text>
        </Text>

        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[3]}
                  onValueChange={() => handleCheck(3)} />
            <Text style={styles.mainText}>개인정보 수집 이용 동의(선택)</Text>
        </Text>

        <Text style={{flexDirection: 'row', marginLeft: 60, marginBottom: 20}}>
            <CheckBox style={styles.checkBox} 
                  value={isCheckedList[4]}
                  onValueChange={() => handleCheck(4)} />
            <Text style={styles.mainText}>마케팅 수신 동의(선택)</Text>
        </Text>
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('stackSignup2')}>
                <Text style={styles.buttonText}>다음</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

const SignupScreen2 = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [validTime, setValidTime] = useState('');
    
    const handleSignup = () => {
      // 회원가입 처리 로직
    }

    const checkhandlePress = () => {
      setMessage('사용 가능한 아이디 입니다.');
    };

    const counthandlePress = () => {
      setValidTime('00:10'); // 유효 시간 카운트 시작
    }

    useEffect(() => {
      if (validTime === '') return;
    
      const timer = setInterval(() => {
        const timeArray = validTime.split(':');
        const minute = parseInt(timeArray[0]);
        const second = parseInt(timeArray[1]);
    
        if (second === 0) {
          if (minute === 0) {
            setValidTime('');
            clearInterval(timer);
          } else {
            setValidTime(`${minute - 1}:59`);
          }
        } else {
          setValidTime(`${minute}:${second - 1 < 10 ? '0' + (second - 1) : second - 1}`);
        }
      }, 1000);
    
      return () => clearInterval(timer);
    }, [validTime]);

    
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>회원가입</Text>
        
        <View style={{marginLeft: 40}}>
          <View style={{flexDirection:'row'}}>
            <TextInput style={styles.input} 
                  placeholder='아이디(ID)'
                  placeholderTextColor='grey'>
            </TextInput>
            <TouchableOpacity style={styles.smallbutton} onPress={checkhandlePress}>
                <Text style={styles.smallbuttonText}>중복확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <TextInput style={styles.input} 
                  placeholder='비밀번호(Password)'
                  placeholderTextColor='grey'>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='비밀번호 확인(Password Confirm)'
                  placeholderTextColor='grey'>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='이메일(E-mail)'
                  placeholderTextColor='grey'>
          </TextInput>
          <TextInput style={styles.input} 
                  placeholder='이름(Name)'
                  placeholderTextColor='grey'>
          </TextInput>
          <View style={{flexDirection:'row'}}>
            <TextInput style={styles.input} 
                  placeholder='휴대폰(Phone)'
                  placeholderTextColor='grey'>
            </TextInput>
            <TouchableOpacity style={styles.smallbutton} onPress={counthandlePress}>
                <Text style={styles.smallbuttonText}>인증번호 받기</Text>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row'}}>
          <TextInput style={styles.input} 
                  placeholder='인증번호 입력'
                  placeholderTextColor='grey'>
          </TextInput>
          <Text style={styles.validTime}>{validTime}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('stackSignup3')}>
                <Text style={styles.buttonText}>가입 완료</Text>
            </TouchableOpacity>
        </View>
    </View>
    );
  }

const SignupScreen3 = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>회원가입</Text>
            <View style={{marginTop: 80, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 20, color: 'black'}}>회원가입을 축하합니다!{'\n'}  바로 로그인 해보세요!</Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.reset({routes: [{name: 'stackLogin'}]})}>
                    <Text style={styles.buttonText}>로그인</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 35,
    marginTop: 20,
    marginBottom: 50,
    marginLeft: 40,
    color: 'black'
  },
  input: {
    width: 230,
    height: 44,
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  inputext: {
    marginTop: 80,
    width: 200,
    height: 100,
    padding: 10,
    fontSize: 40,
    textAlign:'left',
    marginBottom: 70,
  },
  checkBox: {
    marginRight: 20,
  },
  mainText: {
    color: 'black'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '40%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  smallbutton: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '25%',
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10
  },
  smallbuttonText: {
    color: '#fff',
    fontSize: 14,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontSize: 18,
    color: 'black'
  },
  modalButton: {
    backgroundColor: '#1c8adb',
    borderRadius: 8,
    width: '40%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  messageContainer: {
    marginTop: 0,
    marginBottom: 10,
  },
  message: {
    fontSize: 10,
    color: 'grey',
  },
  validTime: {
    padding: 25
  }
});

export {SignupScreen1, SignupScreen2, SignupScreen3};