<script setup>
import { onMounted } from 'vue';

import { useAuthStore } from '@/stores/auth';



const authStore = useAuthStore();

const getUserInfo = async () => {
  // try {
    const authToken = localStorage.getItem('psg_auth_token');
    console.log(authToken);
    // const passage = new Passage(APP_ID);
    // const user = passage.getCurrentUser();
    // const userInfo = await user.userInfo();
    // console.log(userInfo);
    // console.log(authToken);

    // const passageUser = new PassageUser(authToken);
    // const user = await passageUser.userInfo(authToken);
    // if (user) {
    await authStore.setToken(authToken);
    // } else {
    //   authStore.unsetToken();
    // }
  // } catch (_) {
  //   authStore.unsetToken();
  // }
};


onMounted(() => {
  getUserInfo();
});
</script>
<template>
  <div class="centro">
    <div class="imagens">
      <img src="/public/foto1.jpg" alt="" />
      <img src="/public/foto2.jpg" alt="" />
      <img src="/public/foto3.jpg" alt="" />
    </div>
    <h1>A solução ideal para os<br />seus treinos!</h1>
    <p>
      O <span class="destaque">InMove</span> potencializa os seus treinos e lhe <br />
      auxilia a alcançar seus objetivos de forma eficaz
    </p>
    <router-link to="/frame1" class="continuar">Começar</router-link>
    <router-link to="/login" class="usuario">Já tenho uma conta</router-link>
  </div>
</template>

<style scoped>
body {
  background-color: #0b4650;
  margin: 0;
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
  font-size: 30px;
  font-weight: 600;
}

.centro p {
  color: white;
  font-size: 16px;
  font-weight: 400;
  margin-top: 0.3125rem;
}

.destaque {
  color: #e6ff2b;
}

.continuar {
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

.usuario {
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

.imagens {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  justify-items: center;
  margin-bottom: 2rem;
}

.imagens img {
  width: 300px;
  height: 200px;
  border-radius: 10%;
  object-fit: cover;
}


.imagens img:nth-child(3) {
  grid-column: 1 / span 2;
  justify-self: center;
}
</style>
