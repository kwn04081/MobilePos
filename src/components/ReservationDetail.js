import React, { useState, useRef } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, Dimensions } from 'react-native';
import OrderMenuCard from '../components/card/OrderMenuCard';
import DatePicker from 'react-native-date-picker';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import { menus } from '../screens/DetailScreen';
import moment from 'moment';
import { SelectList } from 'react-native-dropdown-select-list';

const ReservationDetail = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [date, setDate] = useState(new Date());
  const [people, setPeople] = useState(1);
  const [menus, setMenus] = useState([
    {
      title: '돈까스',
      text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
      price: 13000,
      count: 0
    },
    {
      title: '파스타',
      text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
      price: 12000,
      count: 0
    },
    {
      title: '치킨',
      text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
      price: 13000,
      count: 0
    },
    {
      title: '토스트',
      text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
      price: 12000,
      count: 0
    },
    {
      title: '옥수수',
      text: '육즙이 잘좔좔....겉바속촉 감동의 맛.... 손님 울었음\n가격 13,000원',
      price: 13000,
      count: 0
    },
    {
      title: '햄버거',
      text: '이것이 마약 파스타\n대마 함유\n가격 12,000원',
      price: 13000,
      count: 0
    },
  ]);
  const [isSelected, setSelected] = useState("");
    const data = [
        {key: '1', value:'등록된 카드 1'},
    ]

  const handleOptionClick = (option) => {
    if (selectedOption === option) {
      // 이미 선택된 옵션을 다시 클릭한 경우
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const currentDateTime = new Date();
  const minimumDateTime = new Date(currentDateTime.getTime() + 1800000);
  const formattedDate = moment(date).format('MM/DD/YYYY, hh:mm A');

  const increaseCount = (index) => {
    const updatedMenus = [...menus];
    updatedMenus[index].count++;
    setMenus(updatedMenus); // 메뉴 항목을 저장하는 'menus'라는 상태 변수가 있다고 가정합니다
  };
  
  const decreaseCount = (index) => {
    const updatedMenus = [...menus];
      if (updatedMenus[index].count > 0) {
        updatedMenus[index].count--;
        setMenus(updatedMenus); // 메뉴 항목을 저장하는 'menus'라는 상태 변수가 있다고 가정합니다
      };
  };

  const menuList = menus.map((menu, index) => (
        <OrderMenuCard
          key={index}
          title={menu.title}
          text={menu.text}
          price={menu.price}
          count={menu.count}
          increaseCount={() => increaseCount(index)}
          decreaseCount={() => decreaseCount(index)}
        />
      ));

  const totalPrice = menus
      .filter((menu) => menu.count !== 0)
      .reduce((total, menu) => total + menu.count * menu.price, 0);
      
  function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
      
  const formattedTotalPrice = formatNumberWithCommas(totalPrice);

  return (
    <ScrollView style={styles.container}>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => handleOptionClick('time')}>
          <Text style={styles.titleButton}>   시간 선택   </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: "center"}}>{formattedDate}</Text>
      </View>

      {selectedOption === 'time' && (
        <View style={{alignItems: "center", marginBottom: 20}}>
          <DatePicker date={date} onDateChange={setDate} minimumDate={minimumDateTime} minuteInterval={10} />
        </View>
      )}

      <View style={{flexDirection: "row"}}>
        <TouchableOpacity onPress={() => handleOptionClick('people')}>
          <Text style={styles.titleButton}>   인원 수 선택   </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: "center"}}>{people}명</Text>
      </View>

      {selectedOption === 'people' && (
        <View style={{marginBottom: 20}}>
          <ScrollPicker
            dataSource={['1', '2', '3', '4', '5', '6']}
            selectedIndex={people-1}
            onValueChange={setPeople}
            wrapperColor='#FFFFFF'
          />
        </View>
      )}

      <TouchableOpacity onPress={() => handleOptionClick('table')}>
        <Text style={styles.titleButton}>   테이블 선택</Text>
      </TouchableOpacity>

      {selectedOption === 'table' && (
        <View style={{marginBottom: 20}}>
          <Text>테이블 선택 내용</Text>
        </View>
      )}

      <View>
        <TouchableOpacity onPress={() => handleOptionClick('menu')}>
          <Text style={styles.titleButton}>   메뉴 선택   </Text>
        </TouchableOpacity>
        <Text style={{alignSelf: "center", fontSize: 15}}>{menus
          .filter((menu) => menu.count !== 0) // count가 0이 아닌 메뉴들만 필터링
          .map((menu) => `${menu.title} ${menu.count}`)
          .join(", ")}
        </Text>
      </View>

      {selectedOption === 'menu' && (
        <View style={{marginBottom: 20}}>
           {menuList}
        </View>
      )}

      <View style={{flexDirection: "row"}}>
      <TouchableOpacity onPress={() => handleOptionClick('payment')}>
        <Text style={styles.titleButton}>   결제    </Text>
      </TouchableOpacity>
      <Text style={{alignSelf: "center", fontSize: 20}}>{formattedTotalPrice}원</Text>
      </View>

      {selectedOption === 'payment' && (
        <View style={{marginBottom: 20, flexDirection: "row"}}>
          <Text style={{marginLeft: 30, marginRight:20, fontSize: 15, alignSelf: "center"}}>등록된 카드 </Text>
          <SelectList
                    setSelected={(val) => setSelected(val)} 
                    defaultOption={{ key:'1', value:'등록된 카드 1' }}
                    data ={data}
                    save="value"
                    search={false}
                    boxStyles={{width: 250,
                      height: 50,
                      }}>
                </SelectList>
        </View>
      )}     
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,  
        alignSelf: 'flex-start',
        width: Dimensions.get('window').width
    },
    titleButton: {
        fontSize: 40,
        marginBottom: 20
    },
  });

export default ReservationDetail;