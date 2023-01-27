<template>
  <!-- Portfolio Section -->
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Utente" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
            <input
              v-model="birth_date"
              type="text"
              onmouseenter="(this.type='date')"
              onmouseleave="(this.type='text')"
              class="form-control form-control-lg"
              id="txtBirthDate"
              placeholder="escreve data de nascimento"
              required
            />
            </div>
            <div class="form-group">
              <select id="sltSex" class="form-control form-control-lg" v-model="sex" required>
                <option value>-- SELECIONA SEXO --</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
            <div class="form-group">
              <input
                v-model="contactName"
                type="text"
                class="form-control form-control-lg"
                id="txtContactName"
                placeholder="escreve nome do contacto responsável"
                
              />
            </div>
            <div class="form-group">
              <input
                v-model="contactPhone"
                type="text"
                class="form-control form-control-lg"
                id="txtContactPhone"
                placeholder="escreve telefone do contacto responsável"
                
              />
            </div>
            <div class="form-group">
              <input
                v-model="contactMail"
                type="text"
                class="form-control form-control-lg"
                id="txtContactMail"
                placeholder="escreve e-mail do contacto responsável"
                
              />
            </div>
            
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i>  ADICIONAR</button>
            <router-link
              :to="{name: 'listExperts'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            ><i class="fas fa-window-close"></i>  CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_EXPERT } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExpert",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      name: "",
      birth_date: "",
      sex: "",
      contactName: "", 
      contactPhone: "", 
      contactMail: "" 
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts", "getMessage"])
  },
  methods: {    
    
    add() {
      this.$store.dispatch(`expert/${ADD_EXPERT}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Especialista adicionado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};

</script>