const content = {
    dashboard: `
        <div class="flex justify-between items-end mb-8">
            <div><h1 class="text-3xl font-black">Administración de Galpones</h1><p class="text-emerald-600">Referencia: RF-NU-013</p></div>
            <button class="bg-[#49e619] px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-emerald-200">+ Nuevo Registro</button>
        </div>
        <div class="grid grid-cols-4 gap-6 mb-8">
            <div class="glass-card"> <p class="text-[10px] font-bold text-gray-400">TOTAL AVES</p> <p class="text-3xl font-black">45,280</p> </div>
            <div class="glass-card"> <p class="text-[10px] font-bold text-gray-400">LOTES ACTIVOS</p> <p class="text-3xl font-black">12</p> </div>
            <div class="glass-card"> <p class="text-[10px] font-bold text-gray-400">PROMEDIO SEMANAS</p> <p class="text-3xl font-black">8.4</p> </div>
            <div class="glass-card"> <p class="text-[10px] font-bold text-gray-400">MORTALIDAD ACUM.</p> <p class="text-3xl font-black text-red-500">1.2%</p> </div>
        </div>
        <div class="glass-card">
            <h3 class="font-bold mb-4">Listado de Lotes Actuales</h3>
            <div class="h-40 bg-gray-50 rounded-xl flex items-center justify-center text-gray-300 border-2 border-dashed italic">Tabla de registros integrada...</div>
        </div>`,

    salud: `
        <div class="flex justify-between items-end mb-8">
            <div><h1 class="text-3xl font-black">Salud y Clasificación</h1><p class="text-emerald-600">Seguimiento técnico diario</p></div>
            <button class="bg-white border px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2"><span class="material-symbols-outlined">file_download</span> Exportar Reporte</button>
        </div>
        <div class="grid grid-cols-12 gap-6">
            <div class="col-span-7 glass-card">
                <div class="flex justify-between items-center mb-6">
                    <h3 class="font-bold flex items-center gap-2"><span class="text-red-500 material-symbols-outlined">medical_services</span> Registros de Salud</h3>
                    <span class="text-[10px] bg-red-100 text-red-600 px-2 py-1 rounded font-black">MONITOREO CRÍTICO</span>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <label> <span class="text-xs font-bold text-gray-400">Mortalidad</span> <input type="number" class="input-main text-red-600" value="12"> </label>
                    <label> <span class="text-xs font-bold text-gray-400">Morbilidad</span> <input type="number" class="input-main text-orange-500" value="45"> </label>
                </div>
                <button onclick="saveData()" class="w-full mt-6 bg-[#152111] text-white py-4 rounded-xl font-bold">Registrar Evento de Salud</button>
            </div>
            <div class="col-span-5 glass-card">
                <h3 class="font-bold flex items-center gap-2 mb-6"><span class="text-yellow-500 material-symbols-outlined">egg</span> Clasificación</h3>
                <div class="space-y-3">
                    <div class="flex justify-between items-center p-3 bg-yellow-50 rounded-xl border border-yellow-100">
                        <span class="font-bold text-yellow-700">TIPO AAA</span>
                        <div class="flex items-center gap-3"> <button class="size-8 bg-white rounded-full shadow-sm">-</button> <span class="font-black">1,240</span> <button class="size-8 bg-white rounded-full shadow-sm">+</button> </div>
                    </div>
                    <div class="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                        <span class="font-bold text-gray-600">TIPO AA</span>
                        <div class="flex items-center gap-3"> <button class="size-8 bg-white rounded-full shadow-sm">-</button> <span class="font-black">856</span> <button class="size-8 bg-white rounded-full shadow-sm">+</button> </div>
                    </div>
                </div>
                <button onclick="saveData()" class="w-full mt-4 bg-primary text-black py-4 rounded-xl font-black">Registrar Clasificación Diaria</button>
            </div>
        </div>`
};

function switchTab(tabId) {
    const renderArea = document.getElementById('render-area');
    const buttons = document.querySelectorAll('.nav-btn');
    
    buttons.forEach(b => b.classList.remove('active'));
    if(event) event.currentTarget.classList.add('active');
    
    renderArea.innerHTML = content[tabId] || content.dashboard;
}

function saveData() {
    const toast = document.getElementById('toast');
    toast.classList.remove('hidden');
    
    // Simulación de subida
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Carga por defecto
window.onload = () => switchTab('dashboard');

 <script>
    // 1. Referencias a elementos del DOM
    const btnCambiarFecha = document.querySelector('button:has(.material-icons:contains("event"))') || document.querySelector('button');
    const displayFecha = document.querySelector('.text-base.font-medium') || document.querySelector('span.font-mono');

    // 2. Crear un input de fecha invisible para disparar el selector nativo
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.style.display = 'none';
    document.body.appendChild(dateInput);

    // 3. Función para formatear la fecha a "Viernes, 24 de Mayo, 2024"
    const formatearFecha = (fechaStr) => {
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const fecha = new Date(fechaStr + 'T00:00:00'); // Evitar desfase de zona horaria
        return fecha.toLocaleDateString('es-ES', opciones)
            .replace(/^\w/, (c) => c.toUpperCase()); // Capitalizar primera letra
    };

    // 4. Evento al hacer clic en el botón de la interfaz
    // Buscamos el botón que dice "Cambiar Fecha" o el que tiene el icono de evento
    document.addEventListener('click', (e) => {
        if (e.target.closest('button')?.innerText.includes('event') || 
            e.target.closest('button')?.innerText.includes('Cambiar Fecha')) {
            dateInput.showPicker(); // Abre el calendario nativo del navegador
        }
    });

    // 5. Actualizar la interfaz cuando el usuario selecciona una fecha
    dateInput.addEventListener('change', (e) => {
        const fechaSeleccionada = e.target.value;
        if (fechaSeleccionada) {
            const fechaFormateada = formatearFecha(fechaSeleccionada);
            
            // Actualizamos el texto en la cabecera
            if (displayFecha) {
                displayFecha.innerText = fechaFormateada;
            }

            // Feedback visual: Notificación de cambio
            console.log("Cargando datos para la fecha: " + fechaSeleccionada);
            // Aquí podrías disparar una función para buscar datos en una base de datos
        }
    });
    // 6. Lógica para los botones de cantidad (Opcional pero útil)
    // Hace que los iconos de expand_less/more funcionen como flechas de subir/bajar
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('wheel', (e) => {
            if (e.deltaY < 0) input.value = parseInt(input.value || 0) + 1;
            else if (input.value > 0) input.value = parseInt(input.value || 0) - 1;
            e.preventDefault();
        });
    });
</script>
SS