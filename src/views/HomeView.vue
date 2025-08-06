<script setup></script>
<template>
  <div class="fundo">
    <div class="centro">
      <h1>A solução ideal para os<br />seus treinos!</h1>
      <p>
        O <span class="destaque">InMove</span> potencializa os seus treinos e lhe <br />
        auxilia a alcançar seus objetivos de forma eficaz
      </p>

      <router-link to="/etapa2" class="continuar">Começar</router-link>
      <router-link to="/login" class="usuario">Já tenho uma conta</router-link>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
.fundo {
  background-color: #0b4650;
  width: 100vw;
  height: 100vh;
}

.centro {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;

}

.centro h1 {
  color: white;
  font-family: Poppins, sans-serif;
  font-size: 30px;
  font-weight: 600;
}

.centro p {
  color: white;
  font-size: 16px;
  font-weight: 400;
  font-family: Poppins, sans-serif;
  margin-top: 0.3125rem;
}

.destaque {
  color: #e6ff2b;
}

.continuar{
  margin-top: 2rem;
  background-color: #e6ff2b;
  color: #0b4650;
  border: none;
  border-radius: 10rem;
  text-decoration: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.continuar:hover {
  background-color: #afc01a;
}

.usuario{
  margin-top: 1rem;
  background-color: white;
  color: #0b4650;
  border: none;
  border-radius: 10rem;
  text-decoration: none;
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.usuario:hover {
  background-color: #d9d9d9;
}

.continuar,
.usuario {
    min-width: 10rem;
  max-width: 90%;
  padding: 0.75rem 2rem;
  text-align: center;
}
</style>
