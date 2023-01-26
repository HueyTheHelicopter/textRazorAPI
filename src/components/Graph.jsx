import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Row } from 'react-bootstrap';
import { useState } from 'react';

export default function Graph(props) {
  
  const entities = props['props'];

  const getEntityByName = (name, fr) => {
    // console.log(name, fr)
    let count = 0;
    let obj ;
    Object.values(entities).some((item, idx) => {
      count ++;
      if (item['matchedText'].toLowerCase() === name) {
        Object.defineProperty(item, 'frequency', {
            value: fr,
            writable: true
          })
          obj = item;
        }
      })
    return obj
  }

  const getMostFrequent = (arr) => {
    let t_arr = [];
    
    arr.map((item, i) => {
      let word = item['matchedText'];
      t_arr.push(word.toLowerCase())
    })

    let hashmap = t_arr.reduce( (acc, val) => {
      acc[val] = (acc[val] || 0 ) + 1
        return acc
    },{})

    t_arr = []
    while (t_arr.length !== 5 && Object.keys(hashmap).length > 0) {

      let item_name = Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
      Object.entries(hashmap).map((item, idx) => { if (item[0] === item_name) { t_arr.push(getEntityByName(item[0], item[1]))}})
      delete (hashmap[`${item_name}`])
    }
    return t_arr;
  }
  
  const [wordFreqData, setWordFreqData] = useState(getMostFrequent(entities));

  return (
        <Row className="justify-content-center mb-5">
            <LineChart
                width={1200}
                height={500}
                data={wordFreqData}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="matchedText" style={{padding: "10px"}}/>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="natural" dataKey="frequency" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="natural" dataKey="confidenceScore" stroke="#82ca9d" />
                <Line type="natural" dataKey="relevanceScore" stroke="#d38ed4"/>
            </LineChart>
        </Row>
    );
  };