// Функция для обновления отображения значений ползунков
function updateRangeValue(rangeId, displayId, unit = '') {
    const range = document.getElementById(rangeId);
    const display = document.getElementById(displayId);
    
    if (range && display) {
        range.addEventListener('input', function() {
            display.textContent = this.value + unit;
        });
    }
}

// Функция для переключения состояния кнопок (вкл/выкл)
function toggleState(btnId, iconId, onIcon, offIcon) {
    const btn = document.getElementById(btnId);
    const icon = document.getElementById(iconId);
    
    if (btn) {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.classList.remove('btn-success');
                this.classList.add('btn-outline-secondary');
                this.textContent = 'Выкл';
                if (icon) icon.className = `bi ${offIcon} fs-1 mb-3 text-muted`;
            } else {
                this.classList.add('active');
                this.classList.remove('btn-outline-secondary');
                this.classList.add('btn-success');
                this.textContent = 'Вкл';
                if (icon) icon.className = `bi ${onIcon} fs-1 mb-3 text-success`;
            }
            
            // Имитация отправки данных
            showToast('Состояние обновлено');
        });
    }
}

// Показать уведомление
function showToast(message) {
    // Проверяем, есть ли контейнер для тостов, если нет - создаем
    let toastContainer = document.getElementById('toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }

    const toastHtml = `
        <div class="toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    `;
    
    // Создаем элемент из строки
    const div = document.createElement('div');
    div.innerHTML = toastHtml;
    const toastEl = div.firstElementChild;
    toastContainer.appendChild(toastEl);
    
    // Инициализируем и показываем тост Bootstrap
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
    
    // Удаляем из DOM после скрытия
    toastEl.addEventListener('hidden.bs.toast', () => {
        toastEl.remove();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Инициализация для dashboard.html
    updateRangeValue('tempRange', 'tempDisplay', '°C');
    updateRangeValue('lightRange', 'lightDisplay', '%');
    
    // Обработка кнопок переключения (пример использования)
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('change', function() {
            const status = this.checked ? 'Включено' : 'Выключено';
            const label = this.closest('.card').querySelector('.card-title').textContent;
            showToast(`${label}: ${status}`);
        });
    });
});
