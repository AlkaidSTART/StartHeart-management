// 简约预约服务功能
document.addEventListener('DOMContentLoaded', function() {
    initializeSimpleAppointment();
});

function initializeSimpleAppointment() {
    const appointmentForm = document.querySelector('.appointment-form-simple');
    if (!appointmentForm) return;

    const submitBtn = appointmentForm.querySelector('.submit-btn-simple');
    const formGroups = appointmentForm.querySelectorAll('.form-group-simple');

    // 表单验证规则
    const validationRules = {
        serviceType: {
            required: true,
            message: '请选择服务类型'
        },
        preferredDate: {
            required: true,
            message: '请选择期望日期',
            validate: (value) => {
                const selectedDate = new Date(value);
                const today = new Date();
                const minDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000); // 3天后
                return selectedDate >= minDate;
            }
        },
        timeSlot: {
            required: true,
            message: '请选择时间段'
        },
        requirements: {
            required: false,
            maxLength: 500,
            message: '需求描述不能超过500字'
        },
        contactName: {
            required: true,
            message: '请输入联系人姓名'
        },
        contactPhone: {
            required: true,
            message: '请输入联系电话',
            pattern: /^1[3-9]\d{9}$/,
            patternMessage: '请输入有效的手机号码'
        }
    };

    // 实时验证
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('blur', function() {
                validateField(this);
            });

            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        }
    });

    // 提交表单
    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitAppointment();
        }
    });

    // 验证单个字段
    function validateField(field) {
        const fieldName = field.name;
        const fieldValue = field.value.trim();
        const formGroup = field.closest('.form-group-simple');
        
        const rule = validationRules[fieldName];
        if (!rule) return true;

        // 清除之前的错误状态
        formGroup.classList.remove('error', 'success');
        removeErrorMessage(formGroup);

        // 必填验证
        if (rule.required && !fieldValue) {
            showFieldError(formGroup, rule.message);
            return false;
        }

        // 自定义验证
        if (fieldValue && rule.validate && !rule.validate(fieldValue)) {
            showFieldError(formGroup, rule.message);
            return false;
        }

        // 模式验证
        if (fieldValue && rule.pattern && !rule.pattern.test(fieldValue)) {
            showFieldError(formGroup, rule.patternMessage || rule.message);
            return false;
        }

        // 长度验证
        if (fieldValue && rule.maxLength && fieldValue.length > rule.maxLength) {
            showFieldError(formGroup, rule.message);
            return false;
        }

        // 验证通过
        formGroup.classList.add('success');
        return true;
    }

    // 清除字段错误
    function clearFieldError(field) {
        const formGroup = field.closest('.form-group-simple');
        if (formGroup) {
            formGroup.classList.remove('error');
            removeErrorMessage(formGroup);
        }
    }

    // 显示字段错误
    function showFieldError(formGroup, message) {
        formGroup.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        formGroup.appendChild(errorDiv);
    }

    // 移除错误消息
    function removeErrorMessage(formGroup) {
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    // 验证整个表单
    function validateForm() {
        let isValid = true;
        
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            if (input && !validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    // 提交预约
    function submitAppointment() {
        const formData = new FormData(appointmentForm);
        const appointmentData = {
            serviceType: formData.get('serviceType'),
            preferredDate: formData.get('preferredDate'),
            timeSlot: formData.get('timeSlot'),
            requirements: formData.get('requirements'),
            contactName: formData.get('contactName'),
            contactPhone: formData.get('contactPhone'),
            submitTime: new Date().toISOString()
        };

        // 显示加载状态
        showLoadingState();

        // 模拟提交过程
        setTimeout(() => {
            // 模拟成功响应
            const isSuccess = Math.random() > 0.1; // 90%成功率
            
            if (isSuccess) {
                showSuccessMessage(appointmentData);
                resetForm();
            } else {
                showErrorMessage('预约失败，请稍后重试');
            }
            
            hideLoadingState();
        }, 2000);
    }

    // 显示加载状态
    function showLoadingState() {
        appointmentForm.classList.add('loading-state');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner"></span> 提交中...';
    }

    // 隐藏加载状态
    function hideLoadingState() {
        appointmentForm.classList.remove('loading-state');
        submitBtn.disabled = false;
        submitBtn.innerHTML = '提交预约';
    }

    // 显示成功消息
    function showSuccessMessage(data) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 10px;">✅</div>
            <h4 style="color: #155724; margin-bottom: 10px;">预约提交成功！</h4>
            <p style="margin-bottom: 10px;">我们将在24小时内与您联系确认预约详情。</p>
            <p style="font-size: 0.9rem; color: #666;">
                服务类型：${getServiceTypeName(data.serviceType)}<br>
                期望日期：${formatDate(data.preferredDate)}<br>
                时间段：${data.timeSlot}
            </p>
        `;

        appointmentForm.parentNode.insertBefore(successDiv, appointmentForm.nextSibling);

        // 5秒后自动移除成功消息
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }

    // 显示错误消息
    function showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = 'background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 15px; border-radius: 8px; margin-top: 20px; text-align: center;';
        errorDiv.innerHTML = `
            <div style="font-size: 1.5rem; margin-bottom: 10px;">❌</div>
            <p>${message}</p>
        `;

        appointmentForm.parentNode.insertBefore(errorDiv, appointmentForm.nextSibling);

        // 5秒后自动移除错误消息
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // 重置表单
    function resetForm() {
        appointmentForm.reset();
        formGroups.forEach(group => {
            group.classList.remove('error', 'success');
            removeErrorMessage(group);
        });
    }

    // 获取服务类型名称
    function getServiceTypeName(type) {
        const serviceTypes = {
            'initial-assessment': '初诊评估',
            'follow-up': '随访复诊',
            'parent-consultation': '家长咨询',
            'group-training': '团体训练',
            'individual-therapy': '个别治疗',
            'sensory-training': '感觉统合训练'
        };
        return serviceTypes[type] || type;
    }

    // 格式化日期
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }

    // 设置最小日期（3天后）
    function setMinDate() {
        const dateInput = appointmentForm.querySelector('input[name="preferredDate"]');
        if (dateInput) {
            const today = new Date();
            const minDate = new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000);
            dateInput.min = minDate.toISOString().split('T')[0];
        }
    }

    // 初始化
    setMinDate();
}

// 导出函数
window.SimpleAppointment = {
    initializeSimpleAppointment
};