<script setup></script>

<template>
    <section class="cadastro">
        <div class="titulo">
            <h1>Cadastre-se!</h1>
        </div>
        <div class="primeiraColuna">
            <input type="text" placeholder="Nome" class="input">
            <input type="date" placeholder="Data de Nascimento" class="input">
            <input type="email" placeholder="Email" class="input">
        </div>
    </section>
</template>

<style scoped>

.primeiraColuna {
    display: flex;
    flex-direction: column;
    gap: 20px;
    
}

.cadastro {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.titulo h1{
    color: #e6ff2b;
    font-family: poppins, sans-serif;
    font-weight: 600;
    margin-top: 100px;
    font-size: 30px;
}

.input{ 
    padding: 0.5rem;         
    border: none;    
    border-bottom: 2px solid #ffffff;          
    font-size: 1rem;
    color: white;
}

.input:focus {
  outline: none;
}
</style>