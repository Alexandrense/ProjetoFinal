<template>
  <b-container fluid>
    <!-- Header -->
    <header class="masthead bg-secondary text-white text-center">
    <b-row>
      <b-col>
          <img class="masthead-avatar mb-1" src="@/assets/appcuidar.png" />
          <p class="masthead-subheading font-weight-light">
            App Cuidar
          </p>
      </b-col>
    </b-row>      
    </header>
      
    <!-- Rules section -->
    <section class="page-section bg-primary" id="rules">
      <b-container fluid>
        <h4
          class="page-section-heading text-center text-uppercase text-secondary mb-5"
        >
          REGRAS
        </h4>
        <b-row class="mt-5 mb-5">
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-hippo fa-3x" style="color:white"></i>
            <p>
              1 - Seleciona <strong>ANIMAIS</strong> e estuda tudo sobre os animais que tens disponíveis!
            </p>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-comment fa-3x" style="color:white"></i>
            <p>2 - Mostra quem são os teus animais preferidos e fala com os teus
            amigos sobre qualquer animal!
            </p>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>
        <b-row class="mb-5">
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-table fa-3x" style="color:white"></i>
            <p>3 - Quando te sentires preparado, seleciona <strong>QUIZZES </strong>e começa a
            jogar!
            </p>
          </b-col>
          <b-col cols="2"></b-col>
          <b-col class="text-center">
            <i class="fas fa-medal fa-3x" style="color:white"></i>
            <p>4 - À medida que fores avançando, ganhas pontos, desbloqueias
            novos animais e sobes no ranking dos maiores especialistas de animais
            do planeta!</p>
          </b-col>
          <b-col cols="2"></b-col>
        </b-row>

      </b-container>
    </section>


    <!-- Copyright Section -->
    <section class="copyright py-4 text-center text-white">
      <div class="container">
        <small>Copyright &copy; APPCUIDAR 2023</small>
      </div>
    </section>

    <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes) -->
    <div class="scroll-to-top d-lg-none position-fixed">
      <a
        class="js-scroll-trigger d-block text-center text-white rounded"
        href="#page-top"
      >
        <i class="fa fa-chevron-up"></i>
      </a>
    </div>
  </b-container>
</template>

<script>
import { FETCH_ANIMALS } from "@/store/animals/animal.constants";
import { FETCH_USERS } from "@/store/users/user.constants";
import { SEND_EMAIL } from "@/store/constants";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data: function() {
    return {
      name: "ricardo",
      email: "ricardo.queiros@gmail.com",
      subject: "teste",
      message: "isto é um teste!"
    };
  },
  computed: {
    ...mapGetters(["getMessage", "auth/isUserLoggedIn"])
  },
  methods: {
    showRanking() {
      router.push({ name: "ranking" });
    },
    send() {
      this.$store
        .dispatch(`${SEND_EMAIL}`, this.$data)
        .then(
          () => this.$alert(this.getMessage, "E-mail enviado!", "success"),
          err => this.$alert(`${err.message}`, "Erro", "error")
        );
    }
  },
  created() {
    if (this.isUserLoggedIn) {
      this.$store.dispatch(`animal/${FETCH_ANIMALS}`);
      this.$store.dispatch(`user/${FETCH_USERS}`);
    }
  }
};
</script>
