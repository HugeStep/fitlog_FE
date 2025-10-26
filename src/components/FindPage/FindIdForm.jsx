"use client";
import React, { useState } from "react";
import styles from "./FindIdForm.module.css";
import Input from "../common/Input/Input";  // Input 컴포넌트 임포트
import Button from "../common/Button/Button"; // Button 컴포넌트 임포트

function FindIdForm() {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // 이메일 인증번호 전송
  const handleSendVerification1 = async () => {
    try {
      const res = await fetch("https://fitlog.iubns.net:8080/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      //const res = await fetch("http://fitlog.iubns.net:8080/api/email", {
      //method: "POST",
      //headers: {
      //"Content-Type": "application/json",
      //},
      // body: JSON.stringify({ email }),
      //});


      if (!res.ok) throw new Error(`서버 에러: ${res.status}`);

      const data = await res.json();
      console.log("이메일 전송 응답:", data);
      setIsEmailVerified(true);
    
    
    } catch (err) {
      console.error("이메일 전송 오류:", err);
    }
  }

  // 인증번호 확인
  const handleSendVerification2 = async () => {
   try {
      const res = await fetch("https://fitlog.iubns.net:8080/api/users/password/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body : JSON.stringify({"email": email, "verificationCode": code})
      });

      if (!res.ok) throw new Error(`서버 에러: ${res.status}`);

      const data = await res.json();
      console.log("코드 확인 응답:", data);
      setIsCodeVerified(true);
    } catch (err) {
      console.error("코드 확인 오류:", err);
    }
  };

  // 아이디 찾기
  const handleFindId = async () => {
    try {
      const res = await fetch("https://fitlog.iubns.net:8080/api/users/find-id", {
        method: "POST",
        body: JSON.stringify({
          "nickname": name,
          "email": email,
        }),
      });

      if (!res.ok) throw new Error(`서버 에러: ${res.status}`);

      const data = await res.json();
      console.log("아이디 찾기 응답:", data);

      setId(data?.customid || "아이디를 찾을 수 없습니다");
      setShowModal(true);
    } catch (err) {
      console.error("아이디 찾기 오류:", err);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  // 🔒 모든 필드 + 인증 완료 조건
  const isFormValid =
    name.trim() &&
    email.trim() &&
    code.trim() &&
    isEmailVerified &&
    isCodeVerified;

  return (
    <>
      <div className = "">
        <div className="flex flex-col gap-5 mb-6">
          <Input
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="relative">
            <Input
              type="email"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pr-20" 
            />
            <Button
              onClick={handleSendVerification1}
              disabled={!email.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm px-0 py-0 rounded-xl"
            >
              전송
            </Button>
          {isEmailVerified && (
            <div className="text-green-600 font-bold text-xs absolute mt-1/2">이메일 인증이 완료되었습니다</div>
          )}
          </div>
          <div className="relative">
            <Input
              type="text"
              placeholder="인증번호"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full pr-20"
            />
            <Button
              onClick={handleSendVerification2}
              disabled={!code.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm px-1 py-1 rounded-xl"
            >
              확인
            </Button>
          {isCodeVerified && (
            <div className="text-green-600 font-bold text-xs absolute">인증번호 확인이 완료되었습니다</div>
          )}
          </div>
        </div>
        <Button
          onClick={handleFindId}
          disabled={!isFormValid}
          className={"w-full"}

        >
          아이디 찾기
        </Button>
      </div>
        {showModal && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
              <p>회원님의 아이디는 "<strong>{id}</strong>"입니다</p>
              <Button 
                onClick={handleCloseModal} 
                className={styles.modalCloseButton}
              >
                닫기
              </Button>
            </div>
          </div>
        )}
    </>
  );
}

export default FindIdForm;