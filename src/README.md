## Projeto neo-PI para simular um sistema de armazenamento de produtos de enfermagem

### Domínio da aplicação
* Produtos e Matériais
* Estoque
* Armazenamento(Locais/Armários)
* Aulas e uso didático
* Usuários, Permissões & Auditoria

### Funcionalidades
1. Cadastrar produtos
2. Listar produtos 
3. Remover produtos do banco de dados
4. Atualizar quantidade de itens
5. Atualizar o estoque 
6. Atualizar onde estão armazenados 
7. Exibir um resumo do estoque e do armário
8. Registrar horários de aulas 
9. Registrar instrutor e o período que modificou o banco de dados
10. Cadastrar intrutores




<!doctype html>
<html lang="pt-BR">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sistema de Enfermagem</title>
  <script src="/_sdk/data_sdk.js"></script>
  <script src="/_sdk/element_sdk.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
        body {
            box-sizing: border-box;
            position: relative;
            overflow-x: hidden;
        }
        
        /* Animated Background */
        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(135deg, #ffffff 0%, #fff7ed 50%, #ffffff 100%);
        }
        
        .animated-bg::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: 
                radial-gradient(circle at 20% 30%, rgba(249, 116, 22, 0.438) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgb(48, 119, 235) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgb(249, 116, 22) 0%, transparent 50%);
            animation: float 20s ease-in-out infinite;
        }
        
        .animated-bg::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                linear-gradient(45deg, transparent 40%, rgba(249, 115, 22, 0.05) 50%, transparent 60%),
                linear-gradient(-45deg, transparent 40%, rgba(59, 130, 246, 0.03) 50%, transparent 60%);
            animation: wave 15s ease-in-out infinite alternate;
        }
        
        @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
        }
        
        @keyframes wave {
            0% { transform: translateX(-10px); }
            100% { transform: translateX(10px); }
        }
        
        /* Enhanced Animations */
        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        @keyframes fadeIn {
            from { 
                opacity: 0; 
                transform: translateY(20px) scale(0.95); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }
        
        .slide-in-left {
            animation: slideInLeft 0.5s ease-out;
        }
        
        @keyframes slideInLeft {
            from { 
                opacity: 0; 
                transform: translateX(-30px); 
            }
            to { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        .slide-in-right {
            animation: slideInRight 0.5s ease-out;
        }
        
        @keyframes slideInRight {
            from { 
                opacity: 0; 
                transform: translateX(30px); 
            }
            to { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        .bounce-in {
            animation: bounceIn 0.8s ease-out;
        }
        
        @keyframes bounceIn {
            0% { 
                opacity: 0; 
                transform: scale(0.3); 
            }
            50% { 
                opacity: 1; 
                transform: scale(1.05); 
            }
            70% { 
                transform: scale(0.9); 
            }
            100% { 
                opacity: 1; 
                transform: scale(1); 
            }
        }
        
        .pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
        }
        
        @keyframes pulseGlow {
            0%, 100% { 
                box-shadow: 0 0 5px rgba(249, 115, 22, 0.3); 
            }
            50% { 
                box-shadow: 0 0 20px rgba(249, 115, 22, 0.6), 0 0 30px rgba(249, 115, 22, 0.4); 
            }
        }
        
        .card-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
        }
        
        .card-hover::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.1), transparent);
            transition: left 0.5s;
        }
        
        .card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 
                0 20px 40px rgba(0,0,0,0.1),
                0 0 0 1px rgba(249, 115, 22, 0.1);
        }
        
        .card-hover:hover::before {
            left: 100%;
        }
        
        .btn-animate {
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .btn-animate::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
        }
        
        .btn-animate:hover::before {
            width: 300px;
            height: 300px;
        }
        
        .btn-animate:active {
            transform: scale(0.95);
        }
        
        /* Dark Mode Enhancements */
        .dark-mode {
            background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%) !important;
            color: #ffffff !important;
        }
        
        .dark-mode .animated-bg {
            background: linear-gradient(135deg, #1f2937 0%, #111827 50%, #1f2937 100%) !important;
        }
        
        .dark-mode .animated-bg::before {
            background: 
                radial-gradient(circle at 20% 30%, rgba(249, 115, 22, 0.2) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(249, 115, 22, 0.1) 0%, transparent 50%) !important;
        }
        
        .dark-mode .bg-white {
            background-color: #374151 !important;
            color: #ffffff !important;
        }
        
        .dark-mode .text-gray-900 {
            color: #ffffff !important;
        }
        
        .dark-mode .text-gray-600 {
            color: #d1d5db !important;
        }
        
        .dark-mode .text-gray-500 {
            color: #9ca3af !important;
        }
        
        .dark-mode .text-gray-700 {
            color: #ffffff !important;
        }
        
        .dark-mode .border-gray-200 {
            border-color: #4b5563 !important;
        }
        
        .dark-mode .border-gray-300 {
            border-color: #6b7280 !important;
        }
        
        .dark-mode input, .dark-mode select, .dark-mode textarea {
            background-color: #4b5563 !important;
            color: #ffffff !important;
            border-color: #6b7280 !important;
        }
        
        .dark-mode input::placeholder {
            color: #9ca3af !important;
        }
        
        .loading {
            opacity: 0.6;
            pointer-events: none;
        }
        
        /* Form Animations */
        .form-slide-down {
            animation: slideDown 0.5s ease-out;
        }
        
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
                max-height: 0;
            }
            to {
                opacity: 1;
                transform: translateY(0);
                max-height: 500px;
            }
        }
        
        .form-slide-up {
            animation: slideUp 0.3s ease-in;
        }
        
        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
                max-height: 500px;
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
                max-height: 0;
            }
        }
       
    </style>
  <style>@view-transition { navigation: auto; }</style>
 </head>
 <body class="min-h-full">
  <div class="animated-bg"></div><!-- Login Screen -->
  <div id="loginScreen" class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
   <div class="max-w-md w-full space-y-8">
    <div class="text-center">
     <div class="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
      <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
      </svg>
     </div>
     <h2 id="systemTitle" class="text-3xl font-bold text-gray-900">Sistema de Enfermagem</h2>
     <p id="institutionName" class="mt-2 text-sm text-gray-600">Escola de Enfermagem</p>
    </div>
    <form class="mt-8 space-y-6 bg-white p-8 rounded-xl shadow-lg" onsubmit="handleLogin(event)">
     <div class="space-y-4">
      <div><label for="username" class="block text-sm font-medium text-gray-700">Usuário</label> <input id="username" name="username" type="text" required class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Digite seu usuário">
      </div>
      <div><label for="password" class="block text-sm font-medium text-gray-700">Senha</label> <input id="password" name="password" type="password" required class="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm" placeholder="Digite sua senha">
      </div>
     </div>
     <div><button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"> Entrar </button>
     </div>
    </form>
   </div>
  </div><!-- Main Application -->
  <div id="mainApp" class="hidden min-h-full"><!-- Navigation -->
   <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <div class="flex justify-between h-16">
      <div class="flex items-center">
       <div class="flex-shrink-0 flex items-center">
        <div class="h-8 w-8 bg-blue-600 rounded-full flex items-center justify-center">
         <svg class="h-5 w-5 text-white" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
         </svg>
        </div><span id="navTitle" class="ml-2 text-xl font-semibold text-gray-900">Sistema de Enfermagem</span>
       </div>
       <div class="hidden sm:ml-6 sm:flex sm:space-x-8"><button onclick="showSection('dashboard')" class="nav-btn border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Dashboard </button> <button onclick="showSection('inventory')" class="nav-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Estoque </button> <button onclick="showSection('students')" class="nav-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Alunos </button> <button onclick="showSection('lessons')" class="nav-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Aulas </button> <button onclick="showSection('locations')" class="nav-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Locais </button> <button onclick="showSection('withdrawals')" class="nav-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Retiradas </button> <button onclick="showSection('users')" class="nav-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Usuários </button> <button onclick="showSection('profile')" class="nav-btn border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"> Perfil </button>
       </div>
      </div>
      <div class="flex items-center space-x-4"><span id="currentUserDisplay" class="text-sm text-gray-600"></span> <button onclick="toggleDarkMode()" class="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium btn-animate"> 🌙 </button> <button onclick="logout()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> Sair </button>
      </div>
     </div>
    </div>
   </nav><!-- Dashboard Section -->
   <div id="dashboardSection" class="section-content">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1><!-- Search Bar -->
      <div class="mb-8">
       <div class="max-w-md"><label for="globalSearch" class="block text-sm font-medium text-gray-700 mb-2">Busca Global</label>
        <div class="relative"><input type="text" id="globalSearch" placeholder="Buscar em todo o sistema..." class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" oninput="performGlobalSearch(this.value)">
         <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
         </div>
        </div>
       </div>
       <div id="searchResults" class="mt-4 hidden">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Resultados da Busca</h3>
        <div id="searchResultsList" class="space-y-2"></div>
       </div>
      </div><!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
       <div class="bg-white overflow-hidden shadow rounded-lg card-hover cursor-pointer" onclick="showSection('inventory')">
        <div class="p-5">
         <div class="flex items-center">
          <div class="flex-shrink-0">
           <div class="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
            </svg>
           </div>
          </div>
          <div class="ml-5 w-0 flex-1">
           <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
             Total de Itens
            </dt>
            <dd id="totalItems" class="text-lg font-medium text-gray-900">
             0
            </dd>
           </dl>
          </div>
         </div>
        </div>
       </div>
       <div class="bg-white overflow-hidden shadow rounded-lg card-hover cursor-pointer" onclick="showSection('students')">
        <div class="p-5">
         <div class="flex items-center">
          <div class="flex-shrink-0">
           <div class="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
           </div>
          </div>
          <div class="ml-5 w-0 flex-1">
           <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
             Total de Alunos
            </dt>
            <dd id="totalStudents" class="text-lg font-medium text-gray-900">
             0
            </dd>
           </dl>
          </div>
         </div>
        </div>
       </div>
       <div class="bg-white overflow-hidden shadow rounded-lg card-hover cursor-pointer" onclick="showSection('lessons')">
        <div class="p-5">
         <div class="flex items-center">
          <div class="flex-shrink-0">
           <div class="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
           </div>
          </div>
          <div class="ml-5 w-0 flex-1">
           <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
             Total de Aulas
            </dt>
            <dd id="totalLessons" class="text-lg font-medium text-gray-900">
             0
            </dd>
           </dl>
          </div>
         </div>
        </div>
       </div>
       <div class="bg-white overflow-hidden shadow rounded-lg card-hover cursor-pointer" onclick="showSection('users')">
        <div class="p-5">
         <div class="flex items-center">
          <div class="flex-shrink-0">
           <div class="w-8 h-8 bg-indigo-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
            </svg>
           </div>
          </div>
          <div class="ml-5 w-0 flex-1">
           <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
             Total de Usuários
            </dt>
            <dd id="totalUsers" class="text-lg font-medium text-gray-900">
             0
            </dd>
           </dl>
          </div>
         </div>
        </div>
       </div>
       <div class="bg-white overflow-hidden shadow rounded-lg card-hover cursor-pointer" onclick="showExpiringItems()">
        <div class="p-5">
         <div class="flex items-center">
          <div class="flex-shrink-0">
           <div class="w-8 h-8 bg-red-500 rounded-md flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
           </div>
          </div>
          <div class="ml-5 w-0 flex-1">
           <dl>
            <dt class="text-sm font-medium text-gray-500 truncate">
             Itens Vencendo
            </dt>
            <dd id="expiringItems" class="text-lg font-medium text-gray-900">
             0
            </dd>
           </dl>
          </div>
         </div>
        </div>
       </div>
      </div><!-- Expiring Items Modal -->
      <div id="expiringItemsModal" class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
       <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div class="mt-3">
         <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-medium text-gray-900">⚠️ Itens Vencendo (30 dias)</h3><button onclick="closeExpiringItemsModal()" class="text-gray-400 hover:text-gray-600">
           <svg class="w-6 h-6" fill="none" stroke="currentColor" viewbox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
           </svg></button>
         </div>
         <div id="expiringItemsList" class="max-h-96 overflow-y-auto space-y-3"><!-- Expiring items will be populated here -->
         </div>
         <div class="mt-6 flex justify-end"><button onclick="closeExpiringItemsModal()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"> Fechar </button>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Inventory Section -->
   <div id="inventorySection" class="section-content hidden">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-8">
       <h1 class="text-3xl font-bold text-gray-900">Gerenciamento de Estoque</h1><button onclick="showAddItemForm()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"> Adicionar Item </button>
      </div><!-- Add Item Form -->
      <div id="addItemForm" class="hidden mb-8 bg-white p-6 rounded-lg shadow-lg card-hover">
       <h2 class="text-xl font-semibold mb-4 text-orange-600">Adicionar Novo Item</h2>
       <form onsubmit="addInventoryItem(event)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div><label for="itemName" class="block text-sm font-medium text-gray-700">Nome do Item</label> <input type="text" id="itemName" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
        </div>
        <div><label for="itemCode" class="block text-sm font-medium text-gray-700">Código do Item</label> <input type="text" id="itemCode" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Ex: MED001">
        </div>
        <div><label for="itemQuantity" class="block text-sm font-medium text-gray-700">Quantidade</label> <input type="number" id="itemQuantity" required min="1" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
        </div>
        <div><label for="itemCategory" class="block text-sm font-medium text-gray-700">Categoria</label> <select id="itemCategory" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"> <option value="">Selecione uma categoria</option> <option value="Medicamentos">Medicamentos</option> <option value="Equipamentos">Equipamentos</option> <option value="Materiais Descartáveis">Materiais Descartáveis</option> <option value="Instrumentos">Instrumentos</option> <option value="Curativos">Curativos</option> <option value="Soluções">Soluções</option> <option value="Outros">Outros</option> </select>
        </div>
        <div><label for="itemLocation" class="block text-sm font-medium text-gray-700">Local de Armazenamento</label> <select id="itemLocation" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"> <option value="">Selecione o local</option> </select>
        </div>
        <div><label for="manufacturingDate" class="block text-sm font-medium text-gray-700">Data de Fabricação (DD/MM/AAAA)</label> <input type="text" id="manufacturingDate" required pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
        </div>
        <div><label for="expirationDate" class="block text-sm font-medium text-gray-700">Data de Validade (DD/MM/AAAA)</label> <input type="text" id="expirationDate" required pattern="\d{2}/\d{2}/\d{4}" placeholder="DD/MM/AAAA" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
        </div>
        <div class="lg:col-span-3 flex space-x-4"><button type="submit" class="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-md text-sm font-medium btn-animate pulse-glow"> 💾 Salvar Item </button> <button type="button" onclick="hideAddItemForm()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ❌ Cancelar </button>
        </div>
       </form>
      </div><!-- Inventory List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
       <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Itens do Estoque</h3>
        <div id="inventoryList" class="space-y-4">
         <p class="text-gray-500 text-center py-8">Nenhum item cadastrado ainda. Clique em "Adicionar Item" para começar.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Students Section -->
   <div id="studentsSection" class="section-content hidden">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-8">
       <h1 class="text-3xl font-bold text-gray-900">Gerenciamento de Alunos</h1><button onclick="showAddStudentForm()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"> Adicionar Aluno </button>
      </div><!-- Add Student Form -->
      <div id="addStudentForm" class="hidden mb-8 bg-white p-6 rounded-lg shadow-lg card-hover">
       <h2 class="text-xl font-semibold mb-4 text-blue-600">Adicionar Novo Aluno</h2>
       <form onsubmit="addStudent(event)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div><label for="studentName" class="block text-sm font-medium text-gray-700">Nome Completo</label> <input type="text" id="studentName" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        </div>
        <div><label for="studentId" class="block text-sm font-medium text-gray-700">Matrícula</label> <input type="text" id="studentId" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        </div>
        <div><label for="studentEmail" class="block text-sm font-medium text-gray-700">Email</label> <input type="email" id="studentEmail" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
        </div>
        <div><label for="studentPhone" class="block text-sm font-medium text-gray-700">Telefone</label> <input type="tel" id="studentPhone" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="(11) 99999-9999">
        </div>
        <div><label for="studentCourse" class="block text-sm font-medium text-gray-700">Curso</label> <select id="studentCourse" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"> <option value="">Selecione um curso</option> <option value="Enfermagem Básica">Enfermagem Básica</option> <option value="Enfermagem Avançada">Enfermagem Avançada</option> <option value="Cuidados Intensivos">Cuidados Intensivos</option> <option value="Pediatria">Pediatria</option> <option value="Geriatria">Geriatria</option> <option value="Obstetrícia">Obstetrícia</option> <option value="Saúde Mental">Saúde Mental</option> </select>
        </div>
        <div><label for="studentAddress" class="block text-sm font-medium text-gray-700">Endereço</label> <input type="text" id="studentAddress" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Rua, número, bairro">
        </div>
        <div class="lg:col-span-3 flex space-x-4"><button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium btn-animate pulse-glow"> 👨‍🎓 Salvar Aluno </button> <button type="button" onclick="hideAddStudentForm()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ❌ Cancelar </button>
        </div>
       </form>
      </div><!-- Students List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
       <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Lista de Alunos</h3>
        <div id="studentsList" class="space-y-4">
         <p class="text-gray-500 text-center py-8">Nenhum aluno cadastrado ainda. Clique em "Adicionar Aluno" para começar.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Lessons Section -->
   <div id="lessonsSection" class="section-content hidden">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-8">
       <h1 class="text-3xl font-bold text-gray-900">Gerenciamento de Aulas</h1><button onclick="showAddLessonForm()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"> Adicionar Aula </button>
      </div><!-- Add Lesson Form -->
      <div id="addLessonForm" class="hidden mb-8 bg-white p-6 rounded-lg shadow-lg card-hover">
       <h2 class="text-xl font-semibold mb-4 text-purple-600">Adicionar Nova Aula</h2>
       <form onsubmit="addLesson(event)" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label for="lessonTitle" class="block text-sm font-medium text-gray-700">Título da Aula</label> <input type="text" id="lessonTitle" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
        </div>
        <div><label for="lessonInstructor" class="block text-sm font-medium text-gray-700">Instrutor</label> <input type="text" id="lessonInstructor" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
        </div>
        <div><label for="lessonDate" class="block text-sm font-medium text-gray-700">Data da Aula</label> <input type="datetime-local" id="lessonDate" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm">
        </div>
        <div><label for="lessonDescription" class="block text-sm font-medium text-gray-700">Descrição</label> <textarea id="lessonDescription" required rows="3" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"></textarea>
        </div>
        <div class="md:col-span-2 flex space-x-4"><button type="submit" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md text-sm font-medium btn-animate pulse-glow"> 📚 Salvar Aula </button> <button type="button" onclick="hideAddLessonForm()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ❌ Cancelar </button>
        </div>
       </form>
      </div><!-- Lessons List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
       <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Lista de Aulas</h3>
        <div id="lessonsList" class="space-y-4">
         <p class="text-gray-500 text-center py-8">Nenhuma aula cadastrada ainda. Clique em "Adicionar Aula" para começar.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Locations Section -->
   <div id="locationsSection" class="section-content hidden">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-8">
       <h1 class="text-3xl font-bold text-gray-900">Gerenciamento de Locais</h1><button onclick="showAddLocationForm()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"> Adicionar Local </button>
      </div><!-- Add Location Form -->
      <div id="addLocationForm" class="hidden mb-8 bg-white p-6 rounded-lg shadow-lg card-hover">
       <h2 class="text-xl font-semibold mb-4 text-green-600">Adicionar Novo Local</h2>
       <form onsubmit="addLocation(event)" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label for="locationName" class="block text-sm font-medium text-gray-700">Nome do Local</label> <input type="text" id="locationName" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Ex: Armário A1">
        </div>
        <div><label for="locationDescription" class="block text-sm font-medium text-gray-700">Descrição</label> <input type="text" id="locationDescription" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm" placeholder="Descrição do local">
        </div>
        <div class="md:col-span-2 flex space-x-4"><button type="submit" class="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium btn-animate pulse-glow"> 📍 Salvar Local </button> <button type="button" onclick="hideAddLocationForm()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ❌ Cancelar </button>
        </div>
       </form>
      </div><!-- Locations List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
       <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Lista de Locais</h3>
        <div id="locationsList" class="space-y-4">
         <p class="text-gray-500 text-center py-8">Nenhum local cadastrado ainda. Clique em "Adicionar Local" para começar.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Withdrawals Section -->
   <div id="withdrawalsSection" class="section-content hidden">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-8">
       <h1 class="text-3xl font-bold text-gray-900">Retiradas para Aulas</h1><button onclick="showAddWithdrawalForm()" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"> Registrar Retirada </button>
      </div><!-- Add Withdrawal Form -->
      <div id="addWithdrawalForm" class="hidden mb-8 bg-white p-6 rounded-lg shadow-lg card-hover">
       <h2 class="text-xl font-semibold mb-4 text-red-600">Registrar Nova Retirada</h2>
       <form onsubmit="addWithdrawal(event)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div><label for="withdrawnBy" class="block text-sm font-medium text-gray-700">Quem Retirou</label> <input type="text" id="withdrawnBy" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm" placeholder="Nome da pessoa">
        </div>
        <div><label for="itemWithdrawn" class="block text-sm font-medium text-gray-700">Item Retirado</label> <select id="itemWithdrawn" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"> <option value="">Selecione um item</option> </select>
        </div>
        <div><label for="quantityWithdrawn" class="block text-sm font-medium text-gray-700">Quantidade Retirada</label> <input type="number" id="quantityWithdrawn" required min="1" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm">
        </div>
        <div><label for="lessonUsed" class="block text-sm font-medium text-gray-700">Aula que Será Usada</label> <select id="lessonUsed" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"> <option value="">Selecione uma aula</option> </select>
        </div>
        <div><label for="withdrawnAt" class="block text-sm font-medium text-gray-700">Data e Hora da Retirada</label> <input type="datetime-local" id="withdrawnAt" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm">
        </div>
        <div class="lg:col-span-3 flex space-x-4"><button type="submit" class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-sm font-medium btn-animate pulse-glow"> 📤 Registrar Retirada </button> <button type="button" onclick="hideAddWithdrawalForm()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ❌ Cancelar </button>
        </div>
       </form>
      </div><!-- Withdrawals List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
       <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Histórico de Retiradas</h3>
        <div id="withdrawalsList" class="space-y-4">
         <p class="text-gray-500 text-center py-8">Nenhuma retirada registrada ainda. Clique em "Registrar Retirada" para começar.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Users Section -->
   <div id="usersSection" class="section-content hidden">
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <div class="flex justify-between items-center mb-8">
       <h1 class="text-3xl font-bold text-gray-900">Gerenciamento de Usuários</h1><button onclick="showAddUserForm()" class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"> Adicionar Usuário </button>
      </div><!-- Add User Form -->
      <div id="addUserForm" class="hidden mb-8 bg-white p-6 rounded-lg shadow-lg card-hover">
       <h2 class="text-xl font-semibold mb-4 text-indigo-600">Adicionar Novo Usuário</h2>
       <form onsubmit="addUser(event)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div><label for="userName" class="block text-sm font-medium text-gray-700">Nome Completo</label> <input type="text" id="userName" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div><label for="userUsername" class="block text-sm font-medium text-gray-700">Nome de Usuário</label> <input type="text" id="userUsername" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Ex: joao.silva">
        </div>
        <div><label for="userEmail" class="block text-sm font-medium text-gray-700">Email</label> <input type="email" id="userEmail" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        </div>
        <div><label for="userPassword" class="block text-sm font-medium text-gray-700">Senha</label> <input type="password" id="userPassword" required minlength="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="Mínimo 4 caracteres">
        </div>
        <div><label for="userRole" class="block text-sm font-medium text-gray-700">Função</label> <select id="userRole" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"> <option value="">Selecione uma função</option> <option value="Instrutor">Instrutor</option> <option value="Coordenador">Coordenador</option> <option value="Assistente">Assistente</option> </select>
        </div>
        <div><label for="userDepartment" class="block text-sm font-medium text-gray-700">Departamento</label> <select id="userDepartment" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"> <option value="">Selecione um departamento</option> <option value="Enfermagem Básica">Enfermagem Básica</option> <option value="Enfermagem Avançada">Enfermagem Avançada</option> <option value="Cuidados Intensivos">Cuidados Intensivos</option> <option value="Pediatria">Pediatria</option> <option value="Geriatria">Geriatria</option> <option value="Obstetrícia">Obstetrícia</option> <option value="Saúde Mental">Saúde Mental</option> <option value="Administração">Administração</option> </select>
        </div>
        <div class="lg:col-span-3 flex space-x-4"><button type="submit" class="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md text-sm font-medium btn-animate pulse-glow"> 👤 Salvar Usuário </button> <button type="button" onclick="hideAddUserForm()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ❌ Cancelar </button>
        </div>
       </form>
      </div><!-- Users List -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
       <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Lista de Usuários</h3>
        <div id="usersList" class="space-y-4">
         <p class="text-gray-500 text-center py-8">Nenhum usuário cadastrado ainda. Clique em "Adicionar Usuário" para começar.</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div><!-- Profile Section -->
   <div id="profileSection" class="section-content hidden">
    <div class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
     <div class="px-4 py-6 sm:px-0">
      <h1 id="profileTitle" class="text-3xl font-bold text-gray-900 mb-8 bounce-in">👤 Perfil do Administrador</h1>
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- Profile Card -->
       <div class="lg:col-span-1">
        <div class="bg-white p-6 rounded-lg shadow-lg card-hover">
         <div class="text-center">
          <div id="profileAvatar" class="w-24 h-24 bg-gradient-to-br from-orange-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold pulse-glow">
           ADM
          </div>
          <h2 id="profileName" class="text-xl font-semibold text-gray-900">Administrador do Sistema</h2>
          <p id="profileRole" class="text-gray-600">Sistema de Enfermagem</p>
          <div class="mt-4 space-y-2 text-sm text-gray-500">
           <p id="profileLevel">🔐 Nível: Administrador Total</p>
           <p>📅 Último acesso: <span id="lastAccessDate">Hoje</span></p>
           <p>⚡ Status: Online</p>
           <p id="profileAccess">🏥 Acesso: Restrito ao Administrador</p>
          </div>
         </div>
        </div>
       </div><!-- Profile Details -->
       <div class="lg:col-span-2">
        <div class="bg-white p-6 rounded-lg shadow-lg card-hover">
         <h3 id="profileDetailsTitle" class="text-lg font-semibold text-gray-900 mb-4">Informações do Sistema</h3>
         <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
           <div><label class="block text-sm font-medium text-gray-700">Nome de Usuário</label>
            <div id="profileUsername" class="mt-1 p-3 bg-gray-50 rounded-md border">
             ADM
            </div>
           </div>
           <div id="profileEmailSection" class="hidden"><label class="block text-sm font-medium text-gray-700">Email</label>
            <div id="profileEmail" class="mt-1 p-3 bg-gray-50 rounded-md border"></div>
           </div>
           <div><label id="profilePermissionsLabel" class="block text-sm font-medium text-gray-700">Permissões</label>
            <div id="profilePermissions" class="mt-1 p-3 bg-gray-50 rounded-md border">
             Acesso Total
            </div>
           </div>
           <div id="profileDepartmentSection" class="hidden"><label class="block text-sm font-medium text-gray-700">Departamento</label>
            <div id="profileDepartment" class="mt-1 p-3 bg-gray-50 rounded-md border"></div>
           </div>
           <div id="profileModulesSection"><label class="block text-sm font-medium text-gray-700">Módulos Ativos</label>
            <div id="profileModules" class="mt-1 p-3 bg-gray-50 rounded-md border">
             <div class="flex flex-wrap gap-2"><span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Estoque</span> <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Alunos</span> <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Aulas</span> <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Locais</span> <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Retiradas</span> <span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">Usuários</span>
             </div>
            </div>
           </div>
          </div>
          <div class="space-y-4">
           <div id="profileLoginStatsSection" class="hidden"><label class="block text-sm font-medium text-gray-700">Total de Logins</label>
            <div id="profileLoginCount" class="mt-1 p-3 bg-gray-50 rounded-md border">
             0
            </div>
           </div>
           <div><label class="block text-sm font-medium text-gray-700">Versão do Sistema</label>
            <div class="mt-1 p-3 bg-gray-50 rounded-md border">
             v2.2.0
            </div>
           </div>
           <div><label class="block text-sm font-medium text-gray-700">Última Atualização</label>
            <div class="mt-1 p-3 bg-gray-50 rounded-md border">
             Hoje
            </div>
           </div>
           <div><label class="block text-sm font-medium text-gray-700">Tema Ativo</label>
            <div class="mt-1 p-3 bg-gray-50 rounded-md border" id="currentTheme">
             Claro
            </div>
           </div>
          </div>
         </div>
        </div><!-- Edit Profile Button (Only for Users) -->
        <div id="editProfileButton" class="mt-6 hidden"><button onclick="showEditProfileForm()" class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ✏️ Editar Perfil </button>
        </div><!-- Edit Profile Form (Only for Users) -->
        <div id="editProfileForm" class="mt-6 bg-white p-6 rounded-lg shadow-lg hidden">
         <h3 class="text-lg font-semibold text-gray-900 mb-4">Editar Perfil</h3>
         <form onsubmit="updateUserProfile(event)" class="space-y-4">
          <div><label for="editUserName" class="block text-sm font-medium text-gray-700">Nome Completo</label> <input type="text" id="editUserName" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <div><label for="editUserEmail" class="block text-sm font-medium text-gray-700">Email</label> <input type="email" id="editUserEmail" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
          </div>
          <div><label for="editUserPassword" class="block text-sm font-medium text-gray-700">Nova Senha (deixe em branco para manter a atual)</label> <input type="password" id="editUserPassword" minlength="4" class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm" placeholder="Nova senha (opcional)">
          </div>
          <div class="flex space-x-4"><button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium btn-animate"> 💾 Salvar Alterações </button> <button type="button" onclick="hideEditProfileForm()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium btn-animate"> ❌ Cancelar </button>
          </div>
         </form>
        </div>
       </div>
      </div><!-- Statistics Cards -->
      <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
       <div class="bg-gradient-to-br from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg text-white card-hover">
        <div class="flex items-center justify-between">
         <div>
          <p class="text-orange-100">Sessões Hoje</p>
          <p id="profileSessionsToday" class="text-2xl font-bold">1</p>
         </div>
         <div class="text-3xl">
          🔐
         </div>
        </div>
       </div>
       <div class="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg text-white card-hover">
        <div class="flex items-center justify-between">
         <div>
          <p class="text-blue-100">Ações Realizadas</p>
          <p class="text-2xl font-bold" id="actionsCount">0</p>
         </div>
         <div class="text-3xl">
          ⚡
         </div>
        </div>
       </div>
       <div class="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-lg shadow-lg text-white card-hover">
        <div class="flex items-center justify-between">
         <div>
          <p class="text-purple-100">Tempo Online</p>
          <p class="text-2xl font-bold" id="onlineTime">0m</p>
         </div>
         <div class="text-3xl">
          ⏱️
         </div>
        </div>
       </div>
       <div class="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg shadow-lg text-white card-hover">
        <div class="flex items-center justify-between">
         <div>
          <p class="text-green-100">Sistema</p>
          <p class="text-2xl font-bold">OK</p>
         </div>
         <div class="text-3xl">
          ✅
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 
  <script>
    // Configuration and state
        let currentData = [];
        let isLoading = false;
        let currentUser = null;

        const defaultConfig = {
            system_title: "Sistema de Enfermagem",
            institution_name: "Escola de Enfermagem",
            primary_color: "#2563eb",
            secondary_color: "#ffffff",
            text_color: "#111827",
            accent_color: "#f97316",
            background_color: "#fff7ed"
        };

        // Data handler for SDK
        const dataHandler = {
            onDataChanged(data) {
                currentData = data;
                updateDashboardStats();
                renderInventoryList();
                renderStudentsList();
                renderLessonsList();
                renderLocationsList();
                renderWithdrawalsList();
                renderUsersList();
                updateLocationOptions();
                updateItemOptions();
                updateLessonOptions();
            }
        };

        // Element SDK configuration
        const elementConfig = {
            defaultConfig,
            onConfigChange: async (config) => {
                const systemTitle = config.system_title || defaultConfig.system_title;
                const institutionName = config.institution_name || defaultConfig.institution_name;

                // Update text content
                document.getElementById('systemTitle').textContent = systemTitle;
                document.getElementById('institutionName').textContent = institutionName;
                document.getElementById('navTitle').textContent = systemTitle;
            },
            mapToCapabilities: (config) => ({
                recolorables: [
                    {
                        get: () => config.primary_color || defaultConfig.primary_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ primary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.secondary_color || defaultConfig.secondary_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ secondary_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.text_color || defaultConfig.text_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ text_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.accent_color || defaultConfig.accent_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ accent_color: value });
                            }
                        }
                    },
                    {
                        get: () => config.background_color || defaultConfig.background_color,
                        set: (value) => {
                            if (window.elementSdk) {
                                window.elementSdk.setConfig({ background_color: value });
                            }
                        }
                    }
                ],
                borderables: [],
                fontEditable: undefined,
                fontSizeable: undefined
            }),
            mapToEditPanelValues: (config) => new Map([
                ["system_title", config.system_title || defaultConfig.system_title],
                ["institution_name", config.institution_name || defaultConfig.institution_name]
            ])
        };

        // Initialize SDKs
        async function initializeApp() {
            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.init(dataHandler);
                    if (!result.isOk) {
                        console.error("Failed to initialize data SDK");
                    }
                }

                if (window.elementSdk) {
                    window.elementSdk.init(elementConfig);
                }
            } catch (error) {
                console.error("Error initializing app:", error);
            }
        }

        // Authentication functions
        function handleLogin(event) {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Check admin login
            if (username === 'ADM' && password === '4321') {
                currentUser = { username: 'ADM', role: 'admin', name: 'Administrador' };
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('mainApp').classList.remove('hidden');
                document.getElementById('currentUserDisplay').textContent = `👤 ${currentUser.name}`;
                showSection('dashboard');
                return;
            }

            // Check registered users
            const users = currentData.filter(item => item.type === 'user');
            const user = users.find(u => u.userUsername === username && u.userPassword === password && u.userStatus === 'Ativo');
            
            if (user) {
                currentUser = { 
                    username: user.userUsername, 
                    role: 'user', 
                    name: user.userName,
                    data: user
                };
                
                // Update last login
                updateUserLastLogin(user);
                
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('mainApp').classList.remove('hidden');
                document.getElementById('currentUserDisplay').textContent = `👤 ${currentUser.name}`;
                showSection('dashboard');
            } else {
                showToast('❌ Credenciais inválidas! Verifique seu usuário e senha.', 'error');
            }
        }

        async function updateUserLastLogin(user) {
            try {
                const updatedUser = {
                    ...user,
                    lastLogin: new Date().toISOString(),
                    loginCount: (user.loginCount || 0) + 1
                };
                
                if (window.dataSdk) {
                    await window.dataSdk.update(updatedUser);
                }
            } catch (error) {
                console.error("Error updating user login:", error);
            }
        }

        function logout() {
            currentUser = null;
            document.getElementById('mainApp').classList.add('hidden');
            document.getElementById('loginScreen').classList.remove('hidden');
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
            document.getElementById('currentUserDisplay').textContent = '';
        }

        // Dark mode functions
        function toggleDarkMode() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            
            const darkModeBtn = document.querySelector('button[onclick="toggleDarkMode()"]');
            darkModeBtn.style.transform = 'scale(0.8)';
            setTimeout(() => {
                darkModeBtn.textContent = isDark ? '☀️' : '🌙';
                darkModeBtn.style.transform = 'scale(1)';
            }, 150);
            
            updateThemeDisplay();
            incrementActionCount();
        }

        function loadDarkMode() {
            const isDark = localStorage.getItem('darkMode') === 'true';
            if (isDark) {
                document.body.classList.add('dark-mode');
                const darkModeBtn = document.querySelector('button[onclick="toggleDarkMode()"]');
                if (darkModeBtn) darkModeBtn.textContent = '☀️';
            }
        }

        // Navigation functions
        function showSection(sectionName) {
            // Check permissions for users section
            if (sectionName === 'users' && currentUser && currentUser.role !== 'admin') {
                showToast('❌ Acesso negado! Apenas administradores podem gerenciar usuários.', 'error');
                return;
            }

            // Update profile section when accessed
            if (sectionName === 'profile') {
                updateProfileSection();
            }

            document.querySelectorAll('.section-content').forEach(section => {
                if (!section.classList.contains('hidden')) {
                    section.style.animation = 'fadeOut 0.2s ease-in';
                    setTimeout(() => {
                        section.classList.add('hidden');
                        section.style.animation = '';
                    }, 200);
                }
            });
            
            setTimeout(() => {
                const targetSection = document.getElementById(sectionName + 'Section');
                targetSection.classList.remove('hidden');
                targetSection.classList.add('fade-in');
                setTimeout(() => targetSection.classList.remove('fade-in'), 600);
            }, 200);
            
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('border-orange-500', 'text-gray-900');
                btn.classList.add('border-transparent', 'text-gray-500');
            });
            
            const clickedBtn = Array.from(document.querySelectorAll('.nav-btn')).find(btn => 
                btn.textContent.trim().toLowerCase() === sectionName.toLowerCase() ||
                (sectionName === 'dashboard' && btn.textContent.trim() === 'Dashboard') ||
                (sectionName === 'inventory' && btn.textContent.trim() === 'Estoque') ||
                (sectionName === 'students' && btn.textContent.trim() === 'Alunos') ||
                (sectionName === 'lessons' && btn.textContent.trim() === 'Aulas') ||
                (sectionName === 'locations' && btn.textContent.trim() === 'Locais') ||
                (sectionName === 'withdrawals' && btn.textContent.trim() === 'Retiradas') ||
                (sectionName === 'users' && btn.textContent.trim() === 'Usuários') ||
                (sectionName === 'profile' && btn.textContent.trim() === 'Perfil')
            );
            
            if (clickedBtn) {
                clickedBtn.classList.remove('border-transparent', 'text-gray-500');
                clickedBtn.classList.add('border-orange-500', 'text-gray-900');
            }
        }

        // Date formatting functions
        function formatDateInput(input) {
            let value = input.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length >= 5) {
                value = value.substring(0, 5) + '/' + value.substring(5, 9);
            }
            input.value = value;
        }

        function validateDate(dateString) {
            const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            const match = dateString.match(regex);
            if (!match) return false;
            
            const day = parseInt(match[1], 10);
            const month = parseInt(match[2], 10);
            const year = parseInt(match[3], 10);
            
            if (month < 1 || month > 12) return false;
            if (day < 1 || day > 31) return false;
            if (year < 1900 || year > 2100) return false;
            
            const date = new Date(year, month - 1, day);
            return date.getFullYear() === year && 
                   date.getMonth() === month - 1 && 
                   date.getDate() === day;
        }

        // Users functions
        function showAddUserForm() {
            const form = document.getElementById('addUserForm');
            form.classList.remove('hidden');
            form.classList.add('form-slide-down');
            setTimeout(() => form.classList.remove('form-slide-down'), 500);
        }

        function hideAddUserForm() {
            const form = document.getElementById('addUserForm');
            form.classList.add('form-slide-up');
            setTimeout(() => {
                form.classList.add('hidden');
                form.classList.remove('form-slide-up');
                form.querySelector('form').reset();
            }, 300);
        }

        async function addUser(event) {
            event.preventDefault();
            
            if (currentData.length >= 999) {
                showToast("❌ Limite máximo de 999 registros atingido. Exclua alguns registros primeiro.", "error");
                return;
            }

            if (isLoading) return;
            isLoading = true;

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '👤 Salvando...';
            submitBtn.disabled = true;
            event.target.classList.add('loading');

            // Get form values
            const userNameValue = document.getElementById('userName').value.trim();
            const userUsernameValue = document.getElementById('userUsername').value.trim();
            const userEmailValue = document.getElementById('userEmail').value.trim();
            const userPasswordValue = document.getElementById('userPassword').value.trim();
            const userRoleValue = document.getElementById('userRole').value;
            const userDepartmentValue = document.getElementById('userDepartment').value;

            // Validate required fields
            if (!userNameValue || !userUsernameValue || !userEmailValue || !userPasswordValue || !userRoleValue || !userDepartmentValue) {
                showToast("❌ Todos os campos são obrigatórios!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Check if username already exists
            const existingUser = currentData.find(item => 
                item.type === 'user' && 
                item.userUsername === userUsernameValue
            );

            if (existingUser) {
                showToast("❌ Nome de usuário já existe! Escolha outro.", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Check if email already exists
            const existingEmail = currentData.find(item => 
                item.type === 'user' && 
                item.userEmail === userEmailValue
            );

            if (existingEmail) {
                showToast("❌ Email já está em uso! Escolha outro.", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            const userData = {
                id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                type: 'user',
                userName: userNameValue,
                userUsername: userUsernameValue,
                userEmail: userEmailValue,
                userPassword: userPasswordValue,
                userRole: userRoleValue,
                userDepartment: userDepartmentValue,
                userStatus: 'Ativo',
                lastLogin: null,
                loginCount: 0,
                createdAt: new Date().toISOString()
            };

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.create(userData);
                    if (result.isOk) {
                        hideAddUserForm();
                        showToast("✅ Usuário adicionado com sucesso!", "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao adicionar usuário. Tente novamente.", "error");
                        console.error("SDK error:", result.error);
                    }
                }
            } catch (error) {
                console.error("Error adding user:", error);
                showToast("❌ Erro ao adicionar usuário. Tente novamente.", "error");
            } finally {
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
            }
        }

        async function toggleUserStatus(user) {
            if (isLoading) return;
            isLoading = true;

            const newStatus = user.userStatus === 'Ativo' ? 'Inativo' : 'Ativo';
            const updatedUser = { ...user, userStatus: newStatus };

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.update(updatedUser);
                    if (result.isOk) {
                        showToast(`✅ Status do usuário alterado para ${newStatus}!`, "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao alterar status. Tente novamente.", "error");
                    }
                }
            } catch (error) {
                console.error("Error updating user status:", error);
                showToast("❌ Erro ao alterar status. Tente novamente.", "error");
            } finally {
                isLoading = false;
            }
        }

        function deleteUser(user) {
            if (isLoading) return;
            
            const confirmBtn = event.target;
            const originalHTML = confirmBtn.innerHTML;
            const originalClass = confirmBtn.className;
            
            confirmBtn.innerHTML = 'Confirmar?';
            confirmBtn.className = 'ml-4 text-red-800 bg-red-100 px-2 py-1 rounded text-sm font-medium transition-colors';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.innerHTML = 'Cancelar';
            cancelBtn.className = 'ml-2 text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm transition-colors';
            cancelBtn.onclick = () => {
                confirmBtn.innerHTML = originalHTML;
                confirmBtn.className = originalClass;
                cancelBtn.remove();
            };
            
            confirmBtn.parentNode.insertBefore(cancelBtn, confirmBtn.nextSibling);
            
            confirmBtn.onclick = async () => {
                if (isLoading) return;
                isLoading = true;
                confirmBtn.innerHTML = 'Excluindo...';
                confirmBtn.disabled = true;
                cancelBtn.disabled = true;

                try {
                    if (window.dataSdk) {
                        const result = await window.dataSdk.delete(user);
                        if (result.isOk) {
                            showToast("Usuário excluído com sucesso!", "success");
                            incrementActionCount();
                        } else {
                            showToast("Erro ao excluir usuário. Tente novamente.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error deleting user:", error);
                    showToast("Erro ao excluir usuário. Tente novamente.", "error");
                } finally {
                    isLoading = false;
                }
            };
        }

        function renderUsersList() {
            const users = currentData.filter(item => item.type === 'user');
            const container = document.getElementById('usersList');
            
            if (users.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum usuário cadastrado ainda. Clique em "Adicionar Usuário" para começar.</p>';
                return;
            }

            container.innerHTML = users.map(user => {
                const statusColor = user.userStatus === 'Ativo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
                const lastLoginText = user.lastLogin ? 
                    new Date(user.lastLogin).toLocaleString('pt-BR') : 
                    'Nunca fez login';
                
                return `
                    <div class="border border-gray-200 rounded-lg p-4 bg-white">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <div class="flex items-center gap-3 mb-2">
                                    <h4 class="text-lg font-medium text-gray-900">${user.userName}</h4>
                                    <span class="px-2 py-1 rounded text-xs font-medium ${statusColor}">${user.userStatus}</span>
                                </div>
                                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span class="font-medium">Usuário:</span> ${user.userUsername}
                                    </div>
                                    <div>
                                        <span class="font-medium">Email:</span> ${user.userEmail}
                                    </div>
                                    <div>
                                        <span class="font-medium">Função:</span> ${user.userRole}
                                    </div>
                                    <div>
                                        <span class="font-medium">Departamento:</span> ${user.userDepartment}
                                    </div>
                                    <div>
                                        <span class="font-medium">Último Login:</span> ${lastLoginText}
                                    </div>
                                    <div>
                                        <span class="font-medium">Total de Logins:</span> ${user.loginCount || 0}
                                    </div>
                                </div>
                            </div>
                            <div class="flex space-x-2">
                                <button onclick="toggleUserStatus(${JSON.stringify(user).replace(/"/g, '&quot;')})" class="text-blue-600 hover:text-blue-800 transition-colors">
                                    ${user.userStatus === 'Ativo' ? '⏸️' : '▶️'}
                                </button>
                                <button onclick="deleteUser(${JSON.stringify(user).replace(/"/g, '&quot;')})" class="text-red-600 hover:text-red-800 transition-colors">
                                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Inventory functions
        function showAddItemForm() {
            const form = document.getElementById('addItemForm');
            form.classList.remove('hidden');
            form.classList.add('form-slide-down');
            setTimeout(() => form.classList.remove('form-slide-down'), 500);
            
            // Add date formatting listeners
            const manufacturingDate = document.getElementById('manufacturingDate');
            const expirationDate = document.getElementById('expirationDate');
            
            manufacturingDate.addEventListener('input', () => formatDateInput(manufacturingDate));
            expirationDate.addEventListener('input', () => formatDateInput(expirationDate));
        }

        function hideAddItemForm() {
            const form = document.getElementById('addItemForm');
            form.classList.add('form-slide-up');
            setTimeout(() => {
                form.classList.add('hidden');
                form.classList.remove('form-slide-up');
                form.querySelector('form').reset();
            }, 300);
        }

        async function addInventoryItem(event) {
            event.preventDefault();
            
            if (currentData.length >= 999) {
                showToast("❌ Limite máximo de 999 itens atingido. Exclua alguns itens primeiro.", "error");
                return;
            }

            if (isLoading) return;
            isLoading = true;

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '💾 Salvando...';
            submitBtn.disabled = true;
            event.target.classList.add('loading');

            // Get form values
            const itemNameValue = document.getElementById('itemName').value.trim();
            const itemCodeValue = document.getElementById('itemCode').value.trim();
            const itemQuantityValue = document.getElementById('itemQuantity').value;
            const itemCategoryValue = document.getElementById('itemCategory').value;
            const itemLocationValue = document.getElementById('itemLocation').value;
            const manufacturingDateValue = document.getElementById('manufacturingDate').value.trim();
            const expirationDateValue = document.getElementById('expirationDate').value.trim();

            // Validate required fields
            if (!itemNameValue || !itemCodeValue || !itemQuantityValue || !itemCategoryValue || !itemLocationValue || !manufacturingDateValue || !expirationDateValue) {
                showToast("❌ Todos os campos são obrigatórios!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Validate quantity
            const quantity = parseInt(itemQuantityValue);
            if (isNaN(quantity) || quantity < 1) {
                showToast("❌ Quantidade deve ser um número maior que zero!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Check if item code already exists
            const existingItem = currentData.find(item => 
                item.type === 'inventory' && 
                item.itemCode === itemCodeValue
            );

            if (existingItem) {
                showToast("❌ Código do item já existe! Escolha outro código.", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            if (!validateDate(manufacturingDateValue)) {
                showToast("❌ Data de fabricação inválida. Use o formato DD/MM/AAAA", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            if (!validateDate(expirationDateValue)) {
                showToast("❌ Data de validade inválida. Use o formato DD/MM/AAAA", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            const itemData = {
                id: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                type: 'inventory',
                name: itemNameValue,
                itemCode: itemCodeValue,
                quantity: quantity,
                category: itemCategoryValue,
                location: itemLocationValue,
                manufacturingDate: manufacturingDateValue,
                expirationDate: expirationDateValue,
                createdAt: new Date().toISOString()
            };

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.create(itemData);
                    if (result.isOk) {
                        hideAddItemForm();
                        showToast("✅ Item adicionado com sucesso!", "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao adicionar item. Tente novamente.", "error");
                        console.error("SDK error:", result.error);
                    }
                }
            } catch (error) {
                console.error("Error adding item:", error);
                showToast("❌ Erro ao adicionar item. Tente novamente.", "error");
            } finally {
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
            }
        }

        function deleteInventoryItem(item) {
            if (isLoading) return;
            
            const confirmBtn = event.target;
            const originalHTML = confirmBtn.innerHTML;
            const originalClass = confirmBtn.className;
            
            confirmBtn.innerHTML = 'Confirmar?';
            confirmBtn.className = 'ml-4 text-red-800 bg-red-100 px-2 py-1 rounded text-sm font-medium transition-colors';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.innerHTML = 'Cancelar';
            cancelBtn.className = 'ml-2 text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm transition-colors';
            cancelBtn.onclick = () => {
                confirmBtn.innerHTML = originalHTML;
                confirmBtn.className = originalClass;
                cancelBtn.remove();
            };
            
            confirmBtn.parentNode.insertBefore(cancelBtn, confirmBtn.nextSibling);
            
            confirmBtn.onclick = async () => {
                if (isLoading) return;
                isLoading = true;
                confirmBtn.innerHTML = 'Excluindo...';
                confirmBtn.disabled = true;
                cancelBtn.disabled = true;

                try {
                    if (window.dataSdk) {
                        const result = await window.dataSdk.delete(item);
                        if (result.isOk) {
                            showToast("Item excluído com sucesso!", "success");
                            incrementActionCount();
                        } else {
                            showToast("Erro ao excluir item. Tente novamente.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error deleting item:", error);
                    showToast("Erro ao excluir item. Tente novamente.", "error");
                } finally {
                    isLoading = false;
                }
            };
        }

        function renderInventoryList() {
            const inventoryItems = currentData.filter(item => item.type === 'inventory');
            const container = document.getElementById('inventoryList');
            
            if (inventoryItems.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum item cadastrado ainda. Clique em "Adicionar Item" para começar.</p>';
                return;
            }

            container.innerHTML = inventoryItems.map(item => {
                const [day, month, year] = item.expirationDate.split('/');
                const expirationDate = new Date(year, month - 1, day);
                const today = new Date();
                const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
                const isExpiring = daysUntilExpiration <= 30;
                
                return `
                    <div class="border border-gray-200 rounded-lg p-4 ${isExpiring ? 'bg-red-50 border-red-200' : 'bg-white'}">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h4 class="text-lg font-medium text-gray-900">${item.name}</h4>
                                <div class="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                                    <div>
                                        <span class="font-medium">Código:</span> ${item.itemCode}
                                    </div>
                                    <div>
                                        <span class="font-medium">Quantidade:</span> ${item.quantity}
                                    </div>
                                    <div>
                                        <span class="font-medium">Categoria:</span> ${item.category}
                                    </div>
                                    <div>
                                        <span class="font-medium">Local:</span> ${item.location}
                                    </div>
                                    <div>
                                        <span class="font-medium">Fabricação:</span> ${item.manufacturingDate}
                                    </div>
                                    <div class="${isExpiring ? 'text-red-600 font-medium' : ''}">
                                        <span class="font-medium">Validade:</span> ${item.expirationDate}
                                        ${isExpiring ? ` (${daysUntilExpiration} dias)` : ''}
                                    </div>
                                </div>
                            </div>
                            <button onclick="deleteInventoryItem(${JSON.stringify(item).replace(/"/g, '&quot;')})" class="ml-4 text-red-600 hover:text-red-800 transition-colors">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Students functions
        function showAddStudentForm() {
            const form = document.getElementById('addStudentForm');
            form.classList.remove('hidden');
            form.classList.add('form-slide-down');
            setTimeout(() => form.classList.remove('form-slide-down'), 500);
        }

        function hideAddStudentForm() {
            const form = document.getElementById('addStudentForm');
            form.classList.add('form-slide-up');
            setTimeout(() => {
                form.classList.add('hidden');
                form.classList.remove('form-slide-up');
                form.querySelector('form').reset();
            }, 300);
        }

        async function addStudent(event) {
            event.preventDefault();
            
            if (currentData.length >= 999) {
                showToast("❌ Limite máximo de 999 registros atingido. Exclua alguns registros primeiro.", "error");
                return;
            }

            if (isLoading) return;
            isLoading = true;

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '👨‍🎓 Salvando...';
            submitBtn.disabled = true;
            event.target.classList.add('loading');

            // Get form values
            const studentNameValue = document.getElementById('studentName').value.trim();
            const studentIdValue = document.getElementById('studentId').value.trim();
            const studentEmailValue = document.getElementById('studentEmail').value.trim();
            const studentPhoneValue = document.getElementById('studentPhone').value.trim();
            const studentCourseValue = document.getElementById('studentCourse').value;
            const studentAddressValue = document.getElementById('studentAddress').value.trim();

            // Validate required fields
            if (!studentNameValue || !studentIdValue || !studentEmailValue || !studentCourseValue) {
                showToast("❌ Nome, matrícula, email e curso são obrigatórios!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Check if student ID already exists
            const existingStudentId = currentData.find(item => 
                item.type === 'student' && 
                item.studentId === studentIdValue
            );

            if (existingStudentId) {
                showToast("❌ Matrícula já existe! Escolha outra matrícula.", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Check if email already exists
            const existingEmail = currentData.find(item => 
                item.type === 'student' && 
                item.email === studentEmailValue
            );

            if (existingEmail) {
                showToast("❌ Email já está em uso! Escolha outro email.", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(studentEmailValue)) {
                showToast("❌ Email inválido! Digite um email válido.", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            const studentData = {
                id: 'student_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                type: 'student',
                studentName: studentNameValue,
                studentId: studentIdValue,
                email: studentEmailValue,
                phone: studentPhoneValue || 'Não informado',
                course: studentCourseValue,
                address: studentAddressValue || 'Não informado',
                createdAt: new Date().toISOString()
            };

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.create(studentData);
                    if (result.isOk) {
                        hideAddStudentForm();
                        showToast("✅ Aluno adicionado com sucesso!", "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao adicionar aluno. Tente novamente.", "error");
                        console.error("SDK error:", result.error);
                    }
                }
            } catch (error) {
                console.error("Error adding student:", error);
                showToast("❌ Erro ao adicionar aluno. Tente novamente.", "error");
            } finally {
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
            }
        }

        function deleteStudent(student) {
            if (isLoading) return;
            
            const confirmBtn = event.target;
            const originalHTML = confirmBtn.innerHTML;
            const originalClass = confirmBtn.className;
            
            confirmBtn.innerHTML = 'Confirmar?';
            confirmBtn.className = 'ml-4 text-red-800 bg-red-100 px-2 py-1 rounded text-sm font-medium transition-colors';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.innerHTML = 'Cancelar';
            cancelBtn.className = 'ml-2 text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm transition-colors';
            cancelBtn.onclick = () => {
                confirmBtn.innerHTML = originalHTML;
                confirmBtn.className = originalClass;
                cancelBtn.remove();
            };
            
            confirmBtn.parentNode.insertBefore(cancelBtn, confirmBtn.nextSibling);
            
            confirmBtn.onclick = async () => {
                if (isLoading) return;
                isLoading = true;
                confirmBtn.innerHTML = 'Excluindo...';
                confirmBtn.disabled = true;
                cancelBtn.disabled = true;

                try {
                    if (window.dataSdk) {
                        const result = await window.dataSdk.delete(student);
                        if (result.isOk) {
                            showToast("Aluno excluído com sucesso!", "success");
                            incrementActionCount();
                        } else {
                            showToast("Erro ao excluir aluno. Tente novamente.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error deleting student:", error);
                    showToast("Erro ao excluir aluno. Tente novamente.", "error");
                } finally {
                    isLoading = false;
                }
            };
        }

        function renderStudentsList() {
            const students = currentData.filter(item => item.type === 'student');
            const container = document.getElementById('studentsList');
            
            if (students.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum aluno cadastrado ainda. Clique em "Adicionar Aluno" para começar.</p>';
                return;
            }

            container.innerHTML = students.map(student => `
                <div class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h4 class="text-lg font-medium text-gray-900">${student.studentName}</h4>
                            <div class="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                                <div>
                                    <span class="font-medium">Matrícula:</span> ${student.studentId}
                                </div>
                                <div>
                                    <span class="font-medium">Email:</span> ${student.email}
                                </div>
                                <div>
                                    <span class="font-medium">Curso:</span> ${student.course}
                                </div>
                                <div>
                                    <span class="font-medium">Telefone:</span> ${student.phone}
                                </div>
                                <div>
                                    <span class="font-medium">Endereço:</span> ${student.address}
                                </div>
                            </div>
                        </div>
                        <button onclick="deleteStudent(${JSON.stringify(student).replace(/"/g, '&quot;')})" class="ml-4 text-red-600 hover:text-red-800 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Lessons functions
        function showAddLessonForm() {
            const form = document.getElementById('addLessonForm');
            form.classList.remove('hidden');
            form.classList.add('form-slide-down');
            setTimeout(() => form.classList.remove('form-slide-down'), 500);
        }

        function hideAddLessonForm() {
            const form = document.getElementById('addLessonForm');
            form.classList.add('form-slide-up');
            setTimeout(() => {
                form.classList.add('hidden');
                form.classList.remove('form-slide-up');
                form.querySelector('form').reset();
            }, 300);
        }

        async function addLesson(event) {
            event.preventDefault();
            
            if (currentData.length >= 999) {
                showToast("❌ Limite máximo de 999 registros atingido. Exclua alguns registros primeiro.", "error");
                return;
            }

            if (isLoading) return;
            isLoading = true;

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '📚 Salvando...';
            submitBtn.disabled = true;
            event.target.classList.add('loading');

            // Get form values
            const lessonTitleValue = document.getElementById('lessonTitle').value.trim();
            const lessonInstructorValue = document.getElementById('lessonInstructor').value.trim();
            const lessonDateValue = document.getElementById('lessonDate').value;
            const lessonDescriptionValue = document.getElementById('lessonDescription').value.trim();

            // Validate required fields
            if (!lessonTitleValue || !lessonInstructorValue || !lessonDateValue || !lessonDescriptionValue) {
                showToast("❌ Todos os campos são obrigatórios!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Validate date is not in the past
            const selectedDate = new Date(lessonDateValue);
            const now = new Date();
            if (selectedDate < now) {
                showToast("❌ A data da aula não pode ser no passado!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Check if there's already a lesson with same title and date
            const existingLesson = currentData.find(item => 
                item.type === 'lesson' && 
                item.lessonTitle === lessonTitleValue &&
                item.lessonDate === lessonDateValue
            );

            if (existingLesson) {
                showToast("❌ Já existe uma aula com este título na mesma data e horário!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            const lessonData = {
                id: 'lesson_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                type: 'lesson',
                lessonTitle: lessonTitleValue,
                instructor: lessonInstructorValue,
                lessonDate: lessonDateValue,
                lessonDescription: lessonDescriptionValue,
                createdAt: new Date().toISOString()
            };

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.create(lessonData);
                    if (result.isOk) {
                        hideAddLessonForm();
                        showToast("✅ Aula adicionada com sucesso!", "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao adicionar aula. Tente novamente.", "error");
                        console.error("SDK error:", result.error);
                    }
                }
            } catch (error) {
                console.error("Error adding lesson:", error);
                showToast("❌ Erro ao adicionar aula. Tente novamente.", "error");
            } finally {
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
            }
        }

        function deleteLesson(lesson) {
            if (isLoading) return;
            
            const confirmBtn = event.target;
            const originalHTML = confirmBtn.innerHTML;
            const originalClass = confirmBtn.className;
            
            confirmBtn.innerHTML = 'Confirmar?';
            confirmBtn.className = 'ml-4 text-red-800 bg-red-100 px-2 py-1 rounded text-sm font-medium transition-colors';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.innerHTML = 'Cancelar';
            cancelBtn.className = 'ml-2 text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm transition-colors';
            cancelBtn.onclick = () => {
                confirmBtn.innerHTML = originalHTML;
                confirmBtn.className = originalClass;
                cancelBtn.remove();
            };
            
            confirmBtn.parentNode.insertBefore(cancelBtn, confirmBtn.nextSibling);
            
            confirmBtn.onclick = async () => {
                if (isLoading) return;
                isLoading = true;
                confirmBtn.innerHTML = 'Excluindo...';
                confirmBtn.disabled = true;
                cancelBtn.disabled = true;

                try {
                    if (window.dataSdk) {
                        const result = await window.dataSdk.delete(lesson);
                        if (result.isOk) {
                            showToast("Aula excluída com sucesso!", "success");
                            incrementActionCount();
                        } else {
                            showToast("Erro ao excluir aula. Tente novamente.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error deleting lesson:", error);
                    showToast("Erro ao excluir aula. Tente novamente.", "error");
                } finally {
                    isLoading = false;
                }
            };
        }

        function renderLessonsList() {
            const lessons = currentData.filter(item => item.type === 'lesson');
            const container = document.getElementById('lessonsList');
            
            if (lessons.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhuma aula cadastrada ainda. Clique em "Adicionar Aula" para começar.</p>';
                return;
            }

            container.innerHTML = lessons.map(lesson => `
                <div class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h4 class="text-lg font-medium text-gray-900">${lesson.lessonTitle}</h4>
                            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                <div>
                                    <span class="font-medium">Instrutor:</span> ${lesson.instructor}
                                </div>
                                <div>
                                    <span class="font-medium">Data:</span> ${new Date(lesson.lessonDate).toLocaleString('pt-BR')}
                                </div>
                            </div>
                            <div class="mt-2 text-sm text-gray-600">
                                <span class="font-medium">Descrição:</span> ${lesson.lessonDescription}
                            </div>
                        </div>
                        <button onclick="deleteLesson(${JSON.stringify(lesson).replace(/"/g, '&quot;')})" class="ml-4 text-red-600 hover:text-red-800 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Locations functions
        function showAddLocationForm() {
            const form = document.getElementById('addLocationForm');
            form.classList.remove('hidden');
            form.classList.add('form-slide-down');
            setTimeout(() => form.classList.remove('form-slide-down'), 500);
        }

        function hideAddLocationForm() {
            const form = document.getElementById('addLocationForm');
            form.classList.add('form-slide-up');
            setTimeout(() => {
                form.classList.add('hidden');
                form.classList.remove('form-slide-up');
                form.querySelector('form').reset();
            }, 300);
        }

        async function addLocation(event) {
            event.preventDefault();
            
            if (currentData.length >= 999) {
                showToast("❌ Limite máximo de 999 registros atingido. Exclua alguns registros primeiro.", "error");
                return;
            }

            if (isLoading) return;
            isLoading = true;

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '📍 Salvando...';
            submitBtn.disabled = true;
            event.target.classList.add('loading');

            // Get form values
            const locationNameValue = document.getElementById('locationName').value.trim();
            const locationDescriptionValue = document.getElementById('locationDescription').value.trim();

            // Validate required fields
            if (!locationNameValue) {
                showToast("❌ Nome do local é obrigatório!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            // Check if location name already exists
            const existingLocation = currentData.find(item => 
                item.type === 'location' && 
                item.locationName.toLowerCase() === locationNameValue.toLowerCase()
            );

            if (existingLocation) {
                showToast("❌ Já existe um local com este nome! Escolha outro nome.", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
                return;
            }

            const locationData = {
                id: 'location_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                type: 'location',
                locationName: locationNameValue,
                locationDescription: locationDescriptionValue || 'Sem descrição',
                createdAt: new Date().toISOString()
            };

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.create(locationData);
                    if (result.isOk) {
                        hideAddLocationForm();
                        showToast("✅ Local adicionado com sucesso!", "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao adicionar local. Tente novamente.", "error");
                        console.error("SDK error:", result.error);
                    }
                }
            } catch (error) {
                console.error("Error adding location:", error);
                showToast("❌ Erro ao adicionar local. Tente novamente.", "error");
            } finally {
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
            }
        }

        function deleteLocation(location) {
            if (isLoading) return;
            
            const confirmBtn = event.target;
            const originalHTML = confirmBtn.innerHTML;
            const originalClass = confirmBtn.className;
            
            confirmBtn.innerHTML = 'Confirmar?';
            confirmBtn.className = 'ml-4 text-red-800 bg-red-100 px-2 py-1 rounded text-sm font-medium transition-colors';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.innerHTML = 'Cancelar';
            cancelBtn.className = 'ml-2 text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm transition-colors';
            cancelBtn.onclick = () => {
                confirmBtn.innerHTML = originalHTML;
                confirmBtn.className = originalClass;
                cancelBtn.remove();
            };
            
            confirmBtn.parentNode.insertBefore(cancelBtn, confirmBtn.nextSibling);
            
            confirmBtn.onclick = async () => {
                if (isLoading) return;
                isLoading = true;
                confirmBtn.innerHTML = 'Excluindo...';
                confirmBtn.disabled = true;
                cancelBtn.disabled = true;

                try {
                    if (window.dataSdk) {
                        const result = await window.dataSdk.delete(location);
                        if (result.isOk) {
                            showToast("Local excluído com sucesso!", "success");
                            incrementActionCount();
                        } else {
                            showToast("Erro ao excluir local. Tente novamente.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error deleting location:", error);
                    showToast("Erro ao excluir local. Tente novamente.", "error");
                } finally {
                    isLoading = false;
                }
            };
        }

        function renderLocationsList() {
            const locations = currentData.filter(item => item.type === 'location');
            const container = document.getElementById('locationsList');
            
            if (locations.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhum local cadastrado ainda. Clique em "Adicionar Local" para começar.</p>';
                return;
            }

            container.innerHTML = locations.map(location => `
                <div class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h4 class="text-lg font-medium text-gray-900">${location.locationName}</h4>
                            <div class="mt-2 text-sm text-gray-600">
                                <span class="font-medium">Descrição:</span> ${location.locationDescription}
                            </div>
                        </div>
                        <button onclick="deleteLocation(${JSON.stringify(location).replace(/"/g, '&quot;')})" class="ml-4 text-red-600 hover:text-red-800 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Withdrawals functions
        function showAddWithdrawalForm() {
            const form = document.getElementById('addWithdrawalForm');
            form.classList.remove('hidden');
            form.classList.add('form-slide-down');
            setTimeout(() => form.classList.remove('form-slide-down'), 500);
            
            // Set current date and time
            const now = new Date();
            const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
            document.getElementById('withdrawnAt').value = localDateTime;
        }

        function hideAddWithdrawalForm() {
            const form = document.getElementById('addWithdrawalForm');
            form.classList.add('form-slide-up');
            setTimeout(() => {
                form.classList.add('hidden');
                form.classList.remove('form-slide-up');
                form.querySelector('form').reset();
            }, 300);
        }

        async function addWithdrawal(event) {
            event.preventDefault();
            
            if (currentData.length >= 999) {
                showToast("Limite máximo de 999 registros atingido. Exclua alguns registros primeiro.", "error");
                return;
            }

            if (isLoading) return;
            isLoading = true;

            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '📤 Registrando...';
            submitBtn.disabled = true;
            event.target.classList.add('loading');

            const itemSelect = document.getElementById('itemWithdrawn');
            const selectedItem = itemSelect.options[itemSelect.selectedIndex];
            const itemName = selectedItem.text;

            const lessonSelect = document.getElementById('lessonUsed');
            const selectedLesson = lessonSelect.options[lessonSelect.selectedIndex];
            const lessonName = selectedLesson.text;

            const withdrawalData = {
                id: 'withdrawal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
                type: 'withdrawal',
                withdrawnBy: document.getElementById('withdrawnBy').value,
                itemWithdrawn: itemName,
                quantityWithdrawn: parseInt(document.getElementById('quantityWithdrawn').value),
                lessonUsed: lessonName,
                withdrawnAt: document.getElementById('withdrawnAt').value,
                createdAt: new Date().toISOString()
            };

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.create(withdrawalData);
                    if (result.isOk) {
                        hideAddWithdrawalForm();
                        showToast("✅ Retirada registrada com sucesso!", "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao registrar retirada. Tente novamente.", "error");
                    }
                }
            } catch (error) {
                console.error("Error adding withdrawal:", error);
                showToast("❌ Erro ao registrar retirada. Tente novamente.", "error");
            } finally {
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                event.target.classList.remove('loading');
            }
        }

        function deleteWithdrawal(withdrawal) {
            if (isLoading) return;
            
            const confirmBtn = event.target;
            const originalHTML = confirmBtn.innerHTML;
            const originalClass = confirmBtn.className;
            
            confirmBtn.innerHTML = 'Confirmar?';
            confirmBtn.className = 'ml-4 text-red-800 bg-red-100 px-2 py-1 rounded text-sm font-medium transition-colors';
            
            const cancelBtn = document.createElement('button');
            cancelBtn.innerHTML = 'Cancelar';
            cancelBtn.className = 'ml-2 text-gray-600 bg-gray-100 px-2 py-1 rounded text-sm transition-colors';
            cancelBtn.onclick = () => {
                confirmBtn.innerHTML = originalHTML;
                confirmBtn.className = originalClass;
                cancelBtn.remove();
            };
            
            confirmBtn.parentNode.insertBefore(cancelBtn, confirmBtn.nextSibling);
            
            confirmBtn.onclick = async () => {
                if (isLoading) return;
                isLoading = true;
                confirmBtn.innerHTML = 'Excluindo...';
                confirmBtn.disabled = true;
                cancelBtn.disabled = true;

                try {
                    if (window.dataSdk) {
                        const result = await window.dataSdk.delete(withdrawal);
                        if (result.isOk) {
                            showToast("Retirada excluída com sucesso!", "success");
                            incrementActionCount();
                        } else {
                            showToast("Erro ao excluir retirada. Tente novamente.", "error");
                        }
                    }
                } catch (error) {
                    console.error("Error deleting withdrawal:", error);
                    showToast("Erro ao excluir retirada. Tente novamente.", "error");
                } finally {
                    isLoading = false;
                }
            };
        }

        function renderWithdrawalsList() {
            const withdrawals = currentData.filter(item => item.type === 'withdrawal');
            const container = document.getElementById('withdrawalsList');
            
            if (withdrawals.length === 0) {
                container.innerHTML = '<p class="text-gray-500 text-center py-8">Nenhuma retirada registrada ainda. Clique em "Registrar Retirada" para começar.</p>';
                return;
            }

            container.innerHTML = withdrawals.map(withdrawal => `
                <div class="border border-gray-200 rounded-lg p-4 bg-white">
                    <div class="flex justify-between items-start">
                        <div class="flex-1">
                            <h4 class="text-lg font-medium text-gray-900">${withdrawal.itemWithdrawn}</h4>
                            <div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                                <div>
                                    <span class="font-medium">Retirado por:</span> ${withdrawal.withdrawnBy}
                                </div>
                                <div>
                                    <span class="font-medium">Quantidade:</span> ${withdrawal.quantityWithdrawn}
                                </div>
                                <div>
                                    <span class="font-medium">Aula:</span> ${withdrawal.lessonUsed}
                                </div>
                                <div>
                                    <span class="font-medium">Data/Hora:</span> ${new Date(withdrawal.withdrawnAt).toLocaleString('pt-BR')}
                                </div>
                            </div>
                        </div>
                        <button onclick="deleteWithdrawal(${JSON.stringify(withdrawal).replace(/"/g, '&quot;')})" class="ml-4 text-red-600 hover:text-red-800 transition-colors">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Update options functions
        function updateLocationOptions() {
            const locations = currentData.filter(item => item.type === 'location');
            const select = document.getElementById('itemLocation');
            
            if (select) {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Selecione o local</option>';
                
                locations.forEach(location => {
                    const option = document.createElement('option');
                    option.value = location.locationName;
                    option.textContent = location.locationName;
                    select.appendChild(option);
                });
                
                if (currentValue) {
                    select.value = currentValue;
                }
            }
        }

        function updateItemOptions() {
            const items = currentData.filter(item => item.type === 'inventory');
            const select = document.getElementById('itemWithdrawn');
            
            if (select) {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Selecione um item</option>';
                
                items.forEach(item => {
                    const option = document.createElement('option');
                    option.value = item.id;
                    option.textContent = `${item.name} (${item.quantity} disponível)`;
                    select.appendChild(option);
                });
                
                if (currentValue) {
                    select.value = currentValue;
                }
            }
        }

        function updateLessonOptions() {
            const lessons = currentData.filter(item => item.type === 'lesson');
            const select = document.getElementById('lessonUsed');
            
            if (select) {
                const currentValue = select.value;
                select.innerHTML = '<option value="">Selecione uma aula</option>';
                
                lessons.forEach(lesson => {
                    const option = document.createElement('option');
                    option.value = lesson.id;
                    option.textContent = lesson.lessonTitle;
                    select.appendChild(option);
                });
                
                if (currentValue) {
                    select.value = currentValue;
                }
            }
        }

        // Dashboard functions
        function updateDashboardStats() {
            const inventoryItems = currentData.filter(item => item.type === 'inventory');
            const students = currentData.filter(item => item.type === 'student');
            const lessons = currentData.filter(item => item.type === 'lesson');
            const users = currentData.filter(item => item.type === 'user');
            
            const today = new Date();
            const expiringItems = inventoryItems.filter(item => {
                const [day, month, year] = item.expirationDate.split('/');
                const expirationDate = new Date(year, month - 1, day);
                const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
                return daysUntilExpiration <= 30 && daysUntilExpiration >= 0;
            });

            document.getElementById('totalItems').textContent = inventoryItems.length;
            document.getElementById('totalStudents').textContent = students.length;
            document.getElementById('totalLessons').textContent = lessons.length;
            document.getElementById('totalUsers').textContent = users.length;
            document.getElementById('expiringItems').textContent = expiringItems.length;
        }

        function showExpiringItems() {
            const inventoryItems = currentData.filter(item => item.type === 'inventory');
            const today = new Date();
            const expiringItems = inventoryItems.filter(item => {
                const [day, month, year] = item.expirationDate.split('/');
                const expirationDate = new Date(year, month - 1, day);
                const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
                return daysUntilExpiration <= 30 && daysUntilExpiration >= 0;
            });

            const modal = document.getElementById('expiringItemsModal');
            const itemsList = document.getElementById('expiringItemsList');

            if (expiringItems.length === 0) {
                itemsList.innerHTML = '<p class="text-center text-gray-500 py-8">🎉 Nenhum item vencendo nos próximos 30 dias!</p>';
            } else {
                itemsList.innerHTML = expiringItems.map(item => {
                    const [day, month, year] = item.expirationDate.split('/');
                    const expirationDate = new Date(year, month - 1, day);
                    const daysUntilExpiration = Math.ceil((expirationDate - today) / (1000 * 60 * 60 * 24));
                    
                    let urgencyClass = '';
                    let urgencyIcon = '';
                    if (daysUntilExpiration <= 7) {
                        urgencyClass = 'bg-red-50 border-red-200';
                        urgencyIcon = '🚨';
                    } else if (daysUntilExpiration <= 15) {
                        urgencyClass = 'bg-orange-50 border-orange-200';
                        urgencyIcon = '⚠️';
                    } else {
                        urgencyClass = 'bg-yellow-50 border-yellow-200';
                        urgencyIcon = '⏰';
                    }

                    return `
                        <div class="border rounded-lg p-4 ${urgencyClass}">
                            <div class="flex justify-between items-start">
                                <div class="flex-1">
                                    <h4 class="font-medium text-gray-900">${urgencyIcon} ${item.name}</h4>
                                    <div class="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-600">
                                        <div><span class="font-medium">Código:</span> ${item.itemCode}</div>
                                        <div><span class="font-medium">Quantidade:</span> ${item.quantity}</div>
                                        <div><span class="font-medium">Local:</span> ${item.location}</div>
                                        <div><span class="font-medium">Validade:</span> ${item.expirationDate}</div>
                                    </div>
                                    <div class="mt-2 text-sm font-medium ${daysUntilExpiration <= 7 ? 'text-red-600' : daysUntilExpiration <= 15 ? 'text-orange-600' : 'text-yellow-600'}">
                                        ${daysUntilExpiration === 0 ? 'Vence hoje!' : 
                                          daysUntilExpiration === 1 ? 'Vence amanhã!' : 
                                          `Vence em ${daysUntilExpiration} dias`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('');
            }

            modal.classList.remove('hidden');
        }

        function closeExpiringItemsModal() {
            document.getElementById('expiringItemsModal').classList.add('hidden');
        }

        // Search functions
        function performGlobalSearch(query) {
            const searchResults = document.getElementById('searchResults');
            const searchResultsList = document.getElementById('searchResultsList');
            
            if (!query.trim()) {
                searchResults.classList.add('hidden');
                return;
            }

            const results = currentData.filter(item => {
                const searchText = query.toLowerCase();
                return (
                    (item.name && item.name.toLowerCase().includes(searchText)) ||
                    (item.studentName && item.studentName.toLowerCase().includes(searchText)) ||
                    (item.lessonTitle && item.lessonTitle.toLowerCase().includes(searchText)) ||
                    (item.instructor && item.instructor.toLowerCase().includes(searchText)) ||
                    (item.course && item.course.toLowerCase().includes(searchText)) ||
                    (item.email && item.email.toLowerCase().includes(searchText)) ||
                    (item.locationName && item.locationName.toLowerCase().includes(searchText)) ||
                    (item.withdrawnBy && item.withdrawnBy.toLowerCase().includes(searchText)) ||
                    (item.userName && item.userName.toLowerCase().includes(searchText)) ||
                    (item.userUsername && item.userUsername.toLowerCase().includes(searchText))
                );
            });

            if (results.length === 0) {
                searchResults.classList.add('hidden');
                return;
            }

            searchResultsList.innerHTML = results.map(item => {
                let title, subtitle, type;
                
                if (item.type === 'inventory') {
                    title = item.name;
                    subtitle = `Estoque - Quantidade: ${item.quantity}`;
                    type = 'Estoque';
                } else if (item.type === 'student') {
                    title = item.studentName;
                    subtitle = `Aluno - ${item.course}`;
                    type = 'Aluno';
                } else if (item.type === 'lesson') {
                    title = item.lessonTitle;
                    subtitle = `Aula - ${item.instructor}`;
                    type = 'Aula';
                } else if (item.type === 'location') {
                    title = item.locationName;
                    subtitle = `Local - ${item.locationDescription}`;
                    type = 'Local';
                } else if (item.type === 'withdrawal') {
                    title = item.itemWithdrawn;
                    subtitle = `Retirada - ${item.withdrawnBy}`;
                    type = 'Retirada';
                } else if (item.type === 'user') {
                    title = item.userName;
                    subtitle = `Usuário - ${item.userRole}`;
                    type = 'Usuário';
                }

                return `
                    <div class="bg-white p-3 rounded-md border border-gray-200">
                        <div class="flex justify-between items-start">
                            <div>
                                <h4 class="font-medium text-gray-900">${title}</h4>
                                <p class="text-sm text-gray-600">${subtitle}</p>
                            </div>
                            <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${type}</span>
                        </div>
                    </div>
                `;
            }).join('');

            searchResults.classList.remove('hidden');
        }

        // Utility functions
        function showToast(message, type = 'info') {
            const toast = document.createElement('div');
            toast.className = `fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
                type === 'success' ? 'bg-green-500 text-white' : 
                type === 'error' ? 'bg-red-500 text-white' : 
                'bg-blue-500 text-white'
            }`;
            toast.textContent = message;
            
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.remove();
            }, 3000);
        }

        // Profile functions
        let actionCount = 0;
        let startTime = Date.now();

        function updateProfileSection() {
            if (!currentUser) return;

            if (currentUser.role === 'admin') {
                // Admin profile
                document.getElementById('profileTitle').textContent = '👤 Perfil do Administrador';
                document.getElementById('profileAvatar').textContent = 'ADM';
                document.getElementById('profileName').textContent = 'Administrador do Sistema';
                document.getElementById('profileRole').textContent = 'Sistema de Enfermagem';
                document.getElementById('profileLevel').textContent = '🔐 Nível: Administrador Total';
                document.getElementById('profileAccess').textContent = '🏥 Acesso: Restrito ao Administrador';
                document.getElementById('profileUsername').textContent = 'ADM';
                document.getElementById('profilePermissions').textContent = 'Acesso Total';
                document.getElementById('profileDetailsTitle').textContent = 'Informações do Sistema';
                document.getElementById('profilePermissionsLabel').textContent = 'Permissões';
                document.getElementById('profileSessionsToday').textContent = '1';
                
                // Show admin modules
                document.getElementById('profileModulesSection').classList.remove('hidden');
                document.getElementById('profileModules').innerHTML = `
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Estoque</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Alunos</span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Aulas</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Locais</span>
                        <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Retiradas</span>
                        <span class="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs">Usuários</span>
                    </div>
                `;
                
                // Hide user-specific sections
                document.getElementById('editProfileForm').classList.add('hidden');
                document.getElementById('editProfileButton').classList.add('hidden');
                document.getElementById('profileEmailSection').classList.add('hidden');
                document.getElementById('profileDepartmentSection').classList.add('hidden');
                document.getElementById('profileLoginStatsSection').classList.add('hidden');
            } else {
                // User profile
                const userData = currentUser.data;
                const initials = userData.userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                
                document.getElementById('profileTitle').textContent = '👤 Meu Perfil';
                document.getElementById('profileAvatar').textContent = initials;
                document.getElementById('profileName').textContent = userData.userName;
                document.getElementById('profileRole').textContent = `${userData.userRole} - ${userData.userDepartment}`;
                document.getElementById('profileLevel').textContent = `🔐 Nível: ${userData.userRole}`;
                document.getElementById('profileAccess').textContent = '🏥 Acesso: Sistema de Enfermagem';
                document.getElementById('profileUsername').textContent = userData.userUsername;
                document.getElementById('profilePermissions').textContent = 'Usuário Padrão';
                document.getElementById('profileDetailsTitle').textContent = 'Minhas Informações';
                document.getElementById('profilePermissionsLabel').textContent = 'Função';
                document.getElementById('profileSessionsToday').textContent = '1';
                
                // Show user-specific information
                document.getElementById('profileEmailSection').classList.remove('hidden');
                document.getElementById('profileEmail').textContent = userData.userEmail;
                document.getElementById('profileDepartmentSection').classList.remove('hidden');
                document.getElementById('profileDepartment').textContent = userData.userDepartment;
                document.getElementById('profileLoginStatsSection').classList.remove('hidden');
                document.getElementById('profileLoginCount').textContent = userData.loginCount || 0;
                
                // Show user modules (without Users management)
                document.getElementById('profileModulesSection').classList.remove('hidden');
                document.getElementById('profileModules').innerHTML = `
                    <div class="flex flex-wrap gap-2">
                        <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs">Estoque</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Alunos</span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">Aulas</span>
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Locais</span>
                        <span class="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">Retiradas</span>
                    </div>
                `;
                
                // Show edit profile options
                document.getElementById('editProfileButton').classList.remove('hidden');
            }
        }

        function showEditProfileForm() {
            if (!currentUser || currentUser.role === 'admin') return;
            
            const userData = currentUser.data;
            document.getElementById('editUserName').value = userData.userName;
            document.getElementById('editUserEmail').value = userData.userEmail;
            document.getElementById('editUserPassword').value = '';
            
            document.getElementById('editProfileForm').classList.remove('hidden');
            document.getElementById('editProfileButton').classList.add('hidden');
        }

        function hideEditProfileForm() {
            document.getElementById('editProfileForm').classList.add('hidden');
            document.getElementById('editProfileButton').classList.remove('hidden');
            document.getElementById('editProfileForm').querySelector('form').reset();
        }

        async function updateUserProfile(event) {
            event.preventDefault();
            
            if (!currentUser || currentUser.role === 'admin' || isLoading) return;
            
            isLoading = true;
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '💾 Salvando...';
            submitBtn.disabled = true;

            const userData = currentUser.data;
            const newName = document.getElementById('editUserName').value;
            const newEmail = document.getElementById('editUserEmail').value;
            const newPassword = document.getElementById('editUserPassword').value;

            // Check if username (email) already exists for other users
            const existingUser = currentData.find(item => 
                item.type === 'user' && 
                item.userEmail === newEmail && 
                item.__backendId !== userData.__backendId
            );

            if (existingUser) {
                showToast("❌ Este email já está sendo usado por outro usuário!", "error");
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                return;
            }

            const updatedUserData = {
                ...userData,
                userName: newName,
                userEmail: newEmail
            };

            // Only update password if provided
            if (newPassword.trim()) {
                updatedUserData.userPassword = newPassword;
            }

            try {
                if (window.dataSdk) {
                    const result = await window.dataSdk.update(updatedUserData);
                    if (result.isOk) {
                        // Update current user data
                        currentUser.data = updatedUserData;
                        currentUser.name = newName;
                        document.getElementById('currentUserDisplay').textContent = `👤 ${newName}`;
                        
                        hideEditProfileForm();
                        updateProfileSection();
                        showToast("✅ Perfil atualizado com sucesso!", "success");
                        incrementActionCount();
                    } else {
                        showToast("❌ Erro ao atualizar perfil. Tente novamente.", "error");
                    }
                }
            } catch (error) {
                console.error("Error updating profile:", error);
                showToast("❌ Erro ao atualizar perfil. Tente novamente.", "error");
            } finally {
                isLoading = false;
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }

        function incrementActionCount() {
            actionCount++;
            const actionsElement = document.getElementById('actionsCount');
            if (actionsElement) {
                actionsElement.textContent = actionCount;
            }
        }

        function updateOnlineTime() {
            const elapsed = Math.floor((Date.now() - startTime) / 60000);
            const onlineTimeElement = document.getElementById('onlineTime');
            if (onlineTimeElement) {
                onlineTimeElement.textContent = elapsed + 'm';
            }
        }

        function updateThemeDisplay() {
            const themeElement = document.getElementById('currentTheme');
            if (themeElement) {
                const isDark = document.body.classList.contains('dark-mode');
                themeElement.textContent = isDark ? 'Escuro' : 'Claro';
            }
        }

        // Initialize app when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            loadDarkMode();
            initializeApp();
            updateThemeDisplay();
            updateLastAccessDate();
            
            // Update online time every minute
            setInterval(updateOnlineTime, 60000);
            
            // Add CSS for fadeOut animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; transform: translateY(0); }
                    to { opacity: 0; transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        });

        function updateLastAccessDate() {
            const now = new Date();
            const dateStr = now.toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit', 
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            const lastAccessElement = document.getElementById('lastAccessDate');
            if (lastAccessElement) {
                lastAccessElement.textContent = dateStr;
            }
        }
        </script>
        <script>(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9a0195f312dc2d34',t:'MTc2MzQwNzIzMC4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{ar e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();</script></body>

 
 </html>