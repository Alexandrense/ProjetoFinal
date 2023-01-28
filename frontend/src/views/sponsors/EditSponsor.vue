<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Editar Registo" />

      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <select id="sltUtente" class="form-control form-control-lg" v-model="sponsor.patient" placeholder="utente" required>
                <option v-for="option in patients" :key="option._id">
                  {{ option.name }}
                </option>
              </select>
            </div>
            <div class="form-group">              
            <input
              v-model="sponsor.registryDate"
              type="date"
              onmouseenter="(this.type='date')"
              onmouseleave="(this.type='text')"
              class="form-control form-control-lg"
              id="txtBirthDate"
              placeholder="data do registo"
              required
            />
            </div>
            <div class="form-group">
              <select id="sltBath" class="form-control form-control-lg" v-model="sponsor.bath" required>                
                <option value>-- TOMOU BANHO? --</option>
                <option value="não">NÃO</option>
                <option value="sim">SIM</option>
                <option value="recusou">RECUSOU</option>
              </select>
            </div>
            <div class="form-group">
              <input
                v-model="sponsor.bloodPressure"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve pressão sanguinea"
              />
            </div>
            <div class="form-group">
              <input
                v-model="sponsor.temperature"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve temperatura corporal"
              />
            </div>
            <div class="form-group">
              <select id="sltDayClassification" class="form-control form-control-lg" v-model="sponsor.dayClassification">                
                <option value>-- COMO FOI O DIA DO UTENTE? --</option>
                <option value="RUIM">RUIM</option>
                <option value="BOM">BOM</option>
                <option value="ÓTIMO">ÓTIMO</option>
              </select>
            </div>
            <div class="form-group">
              <textarea
                id="txtDescription"
                class="form-control form-control-lg"
                placeholder="escreve mensagem do sponsor"
                cols="20"
                rows="10"
                v-model="sponsor.description"
                required
              ></textarea>
            </div>
           
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR
            </button>
            <router-link
              :to="{name: 'listSponsors'}"
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
import { EDIT_SPONSOR } from "@/store/sponsors/sponsor.constants";
import { FETCH_EXPERTS } from "@/store/experts/expert.constants";
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditSponsor",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      sponsor: {},
      patients: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsorsById", "getMessage"]),
    ...mapGetters("expert", ["getExperts"])
  },
  methods: {
    removeComments() {
      this.sponsor.comments.length = 0
      this.$alert("Comentários removidos, clique em atualizar!", "Comentários!", "success");
    },
    fetchAnimals() {
      this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then(
        () => {
          this.patients = this.getExperts;
          this.patients.sort(this.compareNames);
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    },
    compareNames(u1, u2) {
      if (u1.name > u2.name) return 1 * this.sortType;
      else if (u1.name < u2.name) return -1 * this.sortType;
      else return 0;
    },
    update() {
      this.$store.dispatch(`sponsor/${EDIT_SPONSOR}`, this.$data.sponsor).then(
        () => {
          this.$alert(this.getMessage, "Sponsor atualizado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.sponsor = this.getSponsorsById(this.$route.params.sponsorId);
    this.sponsor.registryDate = this.sponsor.registryDate.split('T')[0];
    this.fetchAnimals();
  }
};
</script>

<style scoped>
.center_div {
  margin: 0 auto;
  width: 80%;
}
</style>