<template>
    <div>
      <perfect-scrollbar>
        <section v-if="errored">
            <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
        </section>
        <section v-else class='progCal'>
            <div class='dayProg'>
              <h3>Today {{todayDate}}</h3>
              <p v-for="(value, name, index) in todayProg" :key='name.id'>
                {{ index }} {{ value.name }}
              </p>
            </div>
            <hr>
            <span  v-for="(value, name, index) in progData"  :key='name.id'>
                <div  v-if="index <= 6" class='dayProg'>
                  <h3>{{ cleanDates[index]  }} {{ name }}</h3>
                  <p v-for="(entrie) in value" :key="entrie.index"> {{entrie.name}} </p>
                </div>
                <hr>
            </span>
        </section>  
        
      </perfect-scrollbar>
    </div>
</template>
<script>

export default {    
  name: 'prog',
  data: function() {
    return {
      loading: true,
      errored: false,
      errorMessage: [],
      progData: [],
      datesDays: [],
      todayProg: [],
      todayDate: ""
    }
  },
  mounted () {
   fetch("https://tikkalibre.xyz/api/week-info")
    .then(async response => {
      this.progData = await response.json();

      let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
      let today = new Date();
      let dayName = days[today.getDay()];
      this.todayDate = dayName + " " + today.getDate();
      this.todayProg = this.progData[dayName]

      for(let daysKey in this.progData){
        let entries = this.progData[daysKey] // entrie inside each daykey as objects
        for(let entry in entries){
            this.datesDays.push(new Date(entries[entry].start_timestamp).getDate());
        }
      }     
      // check for error response
      if (!response.ok) {
          // get error message from body or default to response statusText
          const error = (this.progData && this.progData.message) || response.statusText;
          return Promise.reject(error);
      }
    })
    .catch(error => {
        this.errorMessage = error;
        console.error("There was an error!", error);
        this.errored = true
    })
    .finally(() => this.loading = false);
  },
  computed: {
    cleanDates: function() {
      let dupChars = this.datesDays.filter((c, index) => {
          return this.datesDays.indexOf(c) == index;
      });
      dupChars.filter(function(datenum) { 
        if(datenum){
          return true
          } else {
            return false
          }
      });
      return dupChars
    },
    // todayProg: function(){
    //   let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    // }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../public/variable';

  p {
      padding: 1rem;
      &:last-child {
        border-bottom: 0.5px solid black;
      }
  }

  p:last-of-type{ margin-bottom: unset;}

  .ps {
    padding: unset;
  }

  h3  {   
      margin: unset;
      padding: 1rem;
      text-align: center;
      border-bottom: 0.5px solid black;
      text-transform: uppercase;
  }

  hr {
    border: none;
    height: .5px;
    border-top: .5px solid $color3;
     background-color: $color3;
  }

</style>