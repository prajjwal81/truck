import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, Text, TextInput, View} from 'react-native';
import {setItem} from './utils/asyncStorage';

const Test = () => {
  const [input, setInput] = useState();
  const [data, setData] = useState([]);
  const cache = {};

  const fetchApi = async text => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/recipes/search?q=${text}`,
      );

      setData(res?.data?.recipes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (input != '') fetchApi(input);
    }, 500);

    return () => {
      clearTimeout(debounce);
    };
  }, [input]);
  return (
    <View>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder="Search"
        style={{
          width: '90%',
          backgroundColor: 'gray',
          padding: '5%',
          alignSelf: 'center',
          marginTop: '5%',
        }}
      />
      <FlatList
        data={data}
        keyExtractor={(item, id) => {
          id?.toString();
        }}
        renderItem={item => {
          console.log(JSON.stringify(item, null, 2));
          return <Text>{item?.item?.name}</Text>;
        }}
      />
    </View>
  );
};
export default Test;
