import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState('+');
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isGameOver, setIsGameOver] = useState(false);

  // নতুন প্রশ্ন তৈরি করার ফাংশন
  const generateQuestion = () => {
    const n1 = Math.floor(Math.random() * 20) + 1;
    const n2 = Math.floor(Math.random() * 20) + 1;
    const isPlus = Math.random() > 0.5;
    const op = isPlus ? '+' : '-';
    const correctAnswer = isPlus ? n1 + n2 : n1 - n2;

    setNum1(n1);
    setNum2(n2);
    setOperator(op);

    // অপশন তৈরি (১টি সঠিক, ৩টি ভুল)
    let ops = [correctAnswer];
    while (ops.length < 4) {
      let wrong = correctAnswer + (Math.floor(Math.random() * 10) - 5);
      if (!ops.includes(wrong)) ops.push(wrong);
    }
    setOptions(ops.sort(() => Math.random() - 0.5));
  };

  // গেম শুরু বা রিস্টার্ট
  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setIsGameOver(false);
    generateQuestion();
  };

  useEffect(() => {
    startGame();
  }, []);

  // টাইমার কাউন্টডাউন
  useEffect(() => {
    if (timeLeft === 0) {
      setIsGameOver(true);
      return;
    }
    if (!isGameOver) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isGameOver]);

  // উত্তর যাচাই করা
  const handleAnswer = (selectedOption) => {
    const correctAnswer = operator === '+' ? num1 + num2 : num1 - num2;
    if (selectedOption === correctAnswer) {
      setScore(score + 10);
      setTimeLeft(10); // সঠিক উত্তরে সময় রিফ্রেশ
      generateQuestion();
    } else {
      setIsGameOver(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚡ Math Rush ⚡</Text>

      {isGameOver ? (
        <View style={styles.card}>
          <Text style={styles.gameOverText}>গেম ওভার!</Text>
          <Text style={styles.finalScore}>তোর মোট স্কোর: {score}</Text>
          <TouchableOpacity style={styles.restartBtn} onPress={startGame}>
            <Text style={styles.btnText}>আবার খেলুন</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={styles.statsRow}>
            <Text style={styles.stats}>স্কোর: {score}</Text>
            <Text style={[styles.stats, { color: timeLeft <= 3 ? 'red' : '#333' }]}>
              সময়: {timeLeft} সে
            </Text>
          </View>

          <Text style={styles.question}>
            {num1} {operator} {num2} = ?
          </Text>

          <View style={styles.optionsGrid}>
            {options.map((opt, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionBtn}
                onPress={() => handleAnswer(opt)}>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1e1e2f', justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffcc00', marginBottom: 30 },
  card: { backgroundColor: '#fff', width: '100%', borderRadius: 15, padding: 20, alignItems: 'center' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  stats: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  question: { fontSize: 36, fontWeight: 'bold', color: '#6200ee', marginVertical: 20 },
  optionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', width: '100%' },
  optionBtn: { backgroundColor: '#6200ee', width: '45%', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 8 },
  optionText: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  gameOverText: { fontSize: 26, fontWeight: 'bold', color: 'red', marginBottom: 10 },
  finalScore: { fontSize: 20, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  restartBtn: { backgroundColor: '#28a745', padding: 15, borderRadius: 10, width: '100%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});
