"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const loadingPhrases = [
  "번호 생성중",
  "우주의 기운을 모으는중",
  "행운의 돼지와 기도하는중",
  "로또의 여신에게 부탁하는중",
  "행운의 별자리 찾는중",
  "네잎클로버 찾는중",
  "행운의 룰렛 돌리는중",
  "복권 요정 소환중",
  "행운의 주문 외우는중",
  "당첨 확률 계산중",
  "행운의 동전 뒤집는중",
  "로또 구슬 닦는중",
  "당첨 번호 예측중",
  "행운의 염주 만지는중",
  "부자되는 주문 외우는중",
  "로또 명당 찾는중",
  "행운의 부적 충전중",
  "당첨 확신 다지는중",
  "로또 여신과 교신중",
  "행운의 제비 뽑는중",
  "당첨 운세 보는중",
  "로또 신에게 기도중",
  "행운의 주사위 굴리는중",
  "당첨 꿈 해몽하는중",
  "로또 점괘 보는중",
  "행운의 카드 뽑는중",
  "당첨 에너지 충전중",
  "로또 마법 시전중",
  "행운의 별똥별 찾는중",
  "당첨 징조 분석중",
  "로또 여행 떠나는중",
  "행운의 거북이와 달리기중",
  "당첨 확신 100% 충전중",
  "로또 요정과 대화중",
  "행운의 비밀 레시피 만드는중",
  "당첨 확률 높이는중",
  "로또 명상 중",
  "행운의 주파수 맞추는중",
  "당첨의 문 두드리는중"
];

export default function Home() {
  const [count, setCount] = useState(1);
  const [numbers, setNumbers] = useState<number[][]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loadingPhrase, setLoadingPhrase] = useState("");
  const [dots, setDots] = useState("");

  const generateLottoNumbers = () => {
    setIsAnimating(true);

    // 디폴트 문구
    setLoadingPhrase(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);

    setDots("");

    const animationDuration = Math.random() * 2000 + 1000; // 1초 ~ 3초 사이의 랜덤 애니메이션 지속 시간
    setTimeout(() => {
      const newNumbers = [];

      for (let i = 0; i < count; i++) {
        const set = new Set<number>();
        while (set.size < 7) {
          set.add(Math.floor(Math.random() * 45) + 1);
        }
        newNumbers.push(Array.from(set).sort((a, b) => a - b));
      }
      setNumbers(newNumbers);

      setIsAnimating(false);
    }, animationDuration);
  };

  useEffect(() => {
    let phraseInterval: NodeJS.Timeout;

    if (isAnimating) {
      phraseInterval = setInterval(() => {
        setLoadingPhrase(loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)]);
      }, 1000);
    }

    return () => {
      clearInterval(phraseInterval);
    };
  }, [isAnimating]);

  useEffect(() => {
    let dotsInterval: NodeJS.Timeout;

    if (isAnimating) {
      dotsInterval = setInterval(() => {
        setDots((prevDots) => {
          if (prevDots.length < 3) {
            return prevDots + ".";
          }
          return "";
        });
      }, 500);
    }
    return () => {
      clearInterval(dotsInterval);
    };
  }, [isAnimating]);

  const getBackgroundColor = (num: number) => {
    if (num <= 9) {
      return "bg-yellow-500";
    }
    if (num <= 19) {
      return "bg-blue-400";
    }
    if (num <= 29) {
      return "bg-red-400";
    }
    if (num <= 39) {
      return "bg-gray-400";
    }
    return "bg-green-500";
  };

  return (
      <div className="min-h-screen bg-gray-900 p-4 sm:p-8 flex flex-col items-center justify-center">
        {/* 로또 번호 생성기 */}
        <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-4xl font-bold text-gray-100 mb-4 sm:mb-8 text-center"
        >
          로또 번호 생성기
        </motion.h1>

        {/* 로또 번호 세트 수 선택 */}
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg mb-4 sm:mb-8 w-full max-w-md"
        >
          <label className="block text-gray-300 text-sm font-bold mb-2">생성할 로또 번호 세트 수:</label>
          <div className="flex items-center">
            <input
                type="number"
                min="1"
                max="10"
                value={count}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setCount(isNaN(value) ? 1 : value);
                }}
                className="shadow apperance-none border bg-gray-700 border-gray-600 rounded w-full py-2 px-3 text-gray-200 leading-tight mr-2 focus:outline-none"
            />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={generateLottoNumbers}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
            >
              번호 생성
            </motion.button>
          </div>
        </motion.div>
        {/* 로또 번호 생성 중 로딩 화면 또는 생성된 로또 번호 화면 */}
        <div className="w-full max-w-md text-white">
          {isAnimating ? (
              <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-500 rounded-lg p-4 shadow-lg mb-4"
              >
                <div className="flex justify-center items-center h-40">
                  <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-20 h-20 bg-blue-500 rounded-full"
                  ></motion.div>
                </div>
                <p className="text-center text-gray-400 mt-2">
                  {loadingPhrase}
                  <span className="inline-block w-8 text-left">{dots}</span>
                </p>
              </motion.div>
          ) : (
              numbers.map((numberSet, index) => {
                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                        }}
                        className="bg-gray-800 rounded-lg p-4 shadow-lg mb-4"
                    >
                      <div className="flex flex-wrap justify-center gap-2">
                        {numberSet.slice(0, 6).map((num, i) => {
                          return (
                              <motion.div
                                  key={i}
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: i * 0.1,
                                  }}
                                  className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${getBackgroundColor(
                                      num
                                  )}`}
                              >
                                {num}
                              </motion.div>
                          );
                        })}
                        <span className="flex items-center text-gray-400 mx-1">+</span>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 20,
                              delay: 0.6,
                            }}
                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg bg-red-500 ${getBackgroundColor(
                                numberSet[6]
                            )}`}
                        >
                          {numberSet[6]}
                        </motion.div>
                      </div>
                      <p className="text-center text-gray-400 mt-2">당첨번호</p>
                    </motion.div>
                );
              })
          )}
        </div>
      </div>
  );
}
