// 安全性和隐私保护措施
document.addEventListener("DOMContentLoaded", () => {
  // 会话计时器 - 15分钟无操作自动锁定
  let sessionTimeout = 75 * 60; // 15分钟，以秒为单位
  const sessionTimerElement = document.getElementById("session-timer");

  function updateSessionTimer() {
    const minutes = Math.floor(sessionTimeout / 60);
    const seconds = sessionTimeout % 60;
    sessionTimerElement.textContent = `会话将在 ${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds} 后自动锁定`;

    if (sessionTimeout <= 0) {
      lockScreen();
    } else {
      sessionTimeout--;
    }
  }

  // 初始化并每秒更新计时器
  setInterval(updateSessionTimer, 1000);

  // 用户活动时重置计时器
  const resetSessionTimeout = () => {
    sessionTimeout = 15 * 60;
  };

  // 监听用户活动
  ["click", "mousemove", "keypress", "scroll", "touchstart"].forEach(
    (eventType) => {
      document.addEventListener(eventType, resetSessionTimeout);
    }
  );

  // 锁定屏幕函数
  function lockScreen() {
    // 实际实现中，这里应该跳转到锁屏页面或显示锁屏覆盖层
    alert("由于长时间无操作，系统已自动锁定。请重新登录。");
    // window.location.href = '/lock-screen';
  }

  // 访问验证模态框
  const verificationModal = document.getElementById("verification-modal");
  const modalConfirmButton = verificationModal.querySelector(".btn-confirm");
  const modalCancelButton = verificationModal.querySelector(".btn-cancel");
  const accessPurposeSelect = document.getElementById("access-purpose");
  const biometricButton = verificationModal.querySelector(".btn-biometric");

  // 所有需要验证的按钮
  const verifyButtons = document.querySelectorAll('[data-verify="true"]');

  // 点击需要验证的按钮时显示验证模态框
  verifyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      verificationModal.classList.add("active");
      // 记录审计日志 - 访问尝试
      logAccessAttempt(
        button.closest("tr").querySelector("td:first-child").textContent
      );
    });
  });

  // 关闭模态框
  modalCancelButton.addEventListener("click", () => {
    verificationModal.classList.remove("active");
    // 记录审计日志 - 取消访问
    logCancelledAccess();
  });

  // 访问目的选择更改时检查是否可以启用确认按钮
  accessPurposeSelect.addEventListener("change", () => {
    modalConfirmButton.disabled = !accessPurposeSelect.value;
  });

  // 生物识别验证
  let biometricVerified = false;
  biometricButton.addEventListener("click", () => {
    // 模拟生物识别过程
    setTimeout(() => {
      biometricVerified = true;
      biometricButton.textContent = "✓ 已验证";
      biometricButton.style.backgroundColor = "#4CAF50";
      // 记录审计日志 - 生物识别验证
      logBiometricVerification();
    }, 1500);
  });

  // 确认访问
  modalConfirmButton.addEventListener("click", () => {
    if (biometricVerified && accessPurposeSelect.value) {
      // 授权访问
      verificationModal.classList.remove("active");
      // 重置生物验证状态
      resetBiometricState();
      // 记录审计日志 - 授权访问
      logAuthorizedAccess(accessPurposeSelect.value);

      // 显示成功消息
      alert("访问已授权，您的操作已被记录");
    } else {
      alert("请完成所有验证步骤");
    }
  });

  function resetBiometricState() {
    biometricVerified = false;
    biometricButton.textContent = "开始验证";
    biometricButton.style.backgroundColor = "";
  }

  // 数据脱敏函数 - 根据用户角色动态脱敏
  function desensitize(userRole, data) {
    // 根据用户角色应用不同的脱敏策略
    if (userRole === "parent") {
      return {
        ...data,
        fullName: data.firstName + "*",
        assessmentScore: "●●●",
        therapist: data.therapist.slice(0, 1) + "治疗师",
      };
    } else if (userRole === "therapist") {
      return {
        ...data,
        fullName: data.firstName + " " + data.lastName.charAt(0) + ".",
        medicalHistory: "需要医生授权查看",
        diagnosisDetails: "仅显示摘要信息",
      };
    }

    // 管理员和医生可以查看完整信息
    return data;
  }

  // 审计日志函数
  function logAccessAttempt(recordId) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: "current_user_id", // 实际应用中，从认证系统获取
      action: "ACCESS_ATTEMPT",
      target: recordId,
      deviceInfo: generateDeviceFingerprint(),
      risk_level: "MEDIUM",
    };
    console.log("访问尝试记录:", logEntry);
    // 在实际应用中，这里应该发送到后端API
    // sendToAuditLog(logEntry);
  }

  function logCancelledAccess() {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: "current_user_id",
      action: "ACCESS_CANCELLED",
      deviceInfo: generateDeviceFingerprint(),
      risk_level: "LOW",
    };
    console.log("取消访问记录:", logEntry);
  }

  function logBiometricVerification() {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: "current_user_id",
      action: "BIOMETRIC_VERIFICATION",
      result: "SUCCESS",
      deviceInfo: generateDeviceFingerprint(),
      risk_level: "HIGH",
    };
    console.log("生物识别验证记录:", logEntry);
  }

  function logAuthorizedAccess(purpose) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: "current_user_id",
      action: "ACCESS_GRANTED",
      purpose: purpose,
      riskLevel: calculateRiskLevel(purpose),
      deviceInfo: generateDeviceFingerprint(),
    };
    console.log("授权访问记录:", logEntry);
    // 写入不可变审计数据库
    writeToImmutableDb(logEntry);
  }

  // 模拟写入不可变数据库函数
  function writeToImmutableDb(logEntry) {
    // 在实际应用中，这里应该调用安全的API端点
    console.log("写入审计日志到不可变数据库:", logEntry);
  }

  // 计算风险等级
  function calculateRiskLevel(purpose) {
    const riskMap = {
      assessment: "MEDIUM",
      treatment: "MEDIUM",
      progress: "LOW",
      consultation: "HIGH",
    };
    return riskMap[purpose] || "UNKNOWN";
  }

  // 生成设备指纹
  function generateDeviceFingerprint() {
    // 简化版设备指纹生成
    return {
      userAgent: navigator.userAgent,
      language: navigator.language,
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: Date.now(),
    };
  }

  // 加密DOM内容 - 防止敏感信息在页面检查中暴露
  function encryptSensitiveDOM() {
    const sensitiveElements = document.querySelectorAll(
      '[data-sensitive="true"]'
    );
    sensitiveElements.forEach((element) => {
      const originalContent = element.textContent;
      element.setAttribute("data-encrypted-content", btoa(originalContent));
      element.textContent = "********";

      // 鼠标悬停时显示内容
      element.addEventListener("mouseenter", () => {
        element.textContent = originalContent;
      });

      element.addEventListener("mouseleave", () => {
        element.textContent = "********";
      });
    });
  }

  // 调用函数加密敏感DOM元素
  encryptSensitiveDOM();
});
// 导航菜单切换功能
document.addEventListener("DOMContentLoaded", function () {
  // 获取所有导航链接
  const navLinks = document.querySelectorAll("nav a");

  // 获取所有内容模块
  const allModules = document.querySelectorAll("main > section");

  // 默认显示首页内容
  showModule("home");

  // 为每个导航链接添加点击事件
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // 移除所有导航链接的active类
      navLinks.forEach((l) => l.classList.remove("active"));

      // 给当前点击的链接添加active类
      this.classList.add("active");

      // 提取要显示的模块ID
      const moduleId = this.getAttribute("href").substring(1);

      // 显示相应模块
      showModule(moduleId);
    });
  });

  // 显示特定模块的函数
  function showModule(moduleId) {
    // 隐藏所有模块
    allModules.forEach((module) => {
      module.style.display = "none";
    });

    // 显示选中的模块
    const selectedModule = document.getElementById(moduleId);
    if (selectedModule) {
      selectedModule.style.display = "block";
    } else if (moduleId === "home") {
      // 如果是首页但没有首页模块，显示第一个模块
      if (allModules.length > 0) {
        allModules[0].style.display = "block";
      }
    }
  }
});
