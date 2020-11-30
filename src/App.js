import React, { useState, useEffect } from 'react';
import './styles/App.scss';

import { motion, useAnimation } from 'framer-motion';

import chilliSVG from './images/chilli.svg';
import fetchData from './fetchData';
import generateText from './generateText';

function App() {

  const [weatherParts, setWeatherParts] = useState({
    current: { sentence: '' },
    later: { sentence: '' }
  });
  const [weatherData, setWeatherData] = useState({
    current: { temp: 0, feelsLike: 0 },
    later: { temp: 0, feelsLike: 0 }
  });
  const [laterTime, setLaterTime] = useState(0);

  const howArr = Array.from('how');
  const isItArr = Array.from('is it?');
  const firstWordControls = useAnimation();
  const secondWordControls = useAnimation();
  const chilliControls = useAnimation();
  const part1ImgControls = useAnimation();
  const part2ImgControls = useAnimation();
  const part1TextControls = useAnimation();
  const part2TextControls = useAnimation();

  const firstWordVariants = {
    before: {},
    after: {
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
        staggerDirection: -1
      }
    }
  }

  const secondWordVariants = {
    before: {},
    after: {
      y: 0,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.1,
      }
    }
  }

  const letterVariant = {
    before: {
      y: '100%'
    },
    after: {
      y: 0
    }
  }

  const sequence = async () => {

    // Set size of chilli based on temp
    [weatherParts.current, weatherParts.later].forEach(part => {
      switch (part.level) {
        case 1: // not chilli
          part.imgScale = 0;
          break;
        case 2: // lil chilli
          part.imgScale = .4;
          break;
        case 3: // chilli
          part.imgScale = .8;
          break;
        case 4: // big chilli
          part.imgScale = 1.1
          break;
        default:
          part.imgScale = 1.3;
          break;
      }
    });

    firstWordControls.start('after');
    await secondWordControls.start('after');
    await chilliControls.start({y: -10});
    part1ImgControls.start({scale: weatherParts.current.imgScale, rotate: 0});
    await part1TextControls.start({scale: 1, rotate: 0});
    part2ImgControls.start({scale: weatherParts.later.imgScale, rotate: 0});
    return await part2TextControls.start({scale: 1, rotate: 0});
  };
  sequence();

  useEffect(() => {

    const populate = async () => {
      const weatherData = await fetchData();
      setWeatherData(weatherData);
      const sentenceData = await generateText(weatherData.current.feelsLike, weatherData.later.feelsLike);
      // return data;
      setWeatherParts(sentenceData);

      var d = new Date(0);
      d.setUTCSeconds(weatherData.later.time);
      setLaterTime(d.getHours() + ':00');
    }
    populate();

  }, []);

  return (
    <div className="App">
      <header>
        <motion.div 
          className='text' 
          variants={firstWordVariants}
          initial={'before'}
          animate={firstWordControls}
        >
          {howArr.map((letter, index) => (
            <motion.div
              key={'firstword' + index}
              variants={letterVariant}
            >
              { letter }
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className='highlight-text'
          // variants={chilliVariants}
          initial={{y: '-100%'}}
          animate={chilliControls}
        >
          Chilli
        </motion.div>

        <motion.div 
          className='text' 
          variants={secondWordVariants}
          initial={'before'}
          animate={secondWordControls}
        >
          {isItArr.map((letter, index) => (
            <motion.div
              key={'firstword' + index}
              variants={letterVariant}
            >
              { letter === " " ? "\u00A0" : letter }
            </motion.div>
          ))}
        </motion.div>
      </header>

      <main>
        <div className='content'>
          <div className='part-1'>
            <motion.p className='info'
              initial={{scale: 0, rotate: -90}}
              animate={part1TextControls}
            >
              { weatherParts.current.sentence }
            </motion.p>
            <motion.img
              initial={{scale: 0, rotate: 180}}
              animate={part1ImgControls} 
              src={chilliSVG}
            />
          </div>
          <div className='part-2'>
            <motion.p className='info'
              initial={{scale: 0, rotate: -90}}
              animate={part2TextControls}
            >
              { weatherParts.later.sentence }
            </motion.p>
            <motion.img
              style={{rotateY: 180}}
              initial={{scale: 0, rotate: 180}}
              animate={part2ImgControls} 
              src={chilliSVG}
            />
          </div>
          <motion.div
            initial={{scale: 0}}
            animate={part2TextControls} // last animated part
          >
            <h1 className='table-title'>Here's the <s>unnecessary</s> stuff</h1>
            <table>
              <tbody>
                <tr>
                  <th></th>
                  <th>Temp</th>
                  <th>Feels Like</th>
                </tr>
                <tr>
                  <td>Now</td>
                  <td>{Math.round(weatherData.current.temp)}°</td>
                  <td>{Math.round(weatherData.current.feelsLike)}°</td>
                </tr>
                <tr>
                  <td>{laterTime}</td>
                  <td>{Math.round(weatherData.later.temp)}°</td>
                  <td>{Math.round(weatherData.later.feelsLike)}°</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
          
        </div>   
      </main>
    </div>
  );
}

export default App;
