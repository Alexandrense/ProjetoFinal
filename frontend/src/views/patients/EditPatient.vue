<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Utente" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="expert.name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
            <input
              v-model="expert.birth_date"
              type="date"
              onmouseenter="(this.type='date')"
              onmouseleave="(this.type='text')"
              class="form-control form-control-lg"
              id="txtBirthDate"
              placeholder="escreve data de nascimento"
              required
            />
            </div>
            <div class="form-group">
              <select id="sltSex" class="form-control form-control-lg" v-model="expert.sex">                
                <option value>-- SELECIONA SEXO --</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>

            <div class="form-group">
              <input
                v-model="expert.contactName"
                type="text"
                class="form-control form-control-lg"
                id="txtContactName"
                placeholder="escreve nome do contacto responsável"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="expert.contactPhone"
                type="text"
                class="form-control form-control-lg"
                id="txtContactPhone"
                placeholder="escreve telefone do contacto responsável"
                
              />
            </div>
            <div class="form-group">
              <input
                v-model="expert.contactMail"
                type="text"
                class="form-control form-control-lg"
                id="txtContactMail"
                placeholder="escreve e-mail do contacto responsável"
                
              />
            </div>
           
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{name: 'listPatients'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { EDIT_EXPERT } from "@/store/experts/expert.constants";

import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      expert: {}
    };
  },
  computed: {
    ...mapGetters("expert", ["getExpertsById", "getMessage"]),
  },
  methods: {
    removeComments() {
      this.sponsor.comments.length = 0
      this.$alert("Comentários removidos, clique em atualizar!", "Comentários!", "success");
    },    
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
    update() {
      this.$store.dispatch(`expert/${EDIT_EXPERT}`, this.$data.expert).then(
        () => {
          this.$alert(this.getMessage, "Especialista atualizado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.expert = this.getExpertsById(this.$route.params.expertId);
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>