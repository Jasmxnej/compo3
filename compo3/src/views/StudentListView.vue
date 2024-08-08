 <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import StudentCard from '@/components/StudentCard.vue';
  import StudentService from '@/services/StudentService';
  import type { Student } from '@/types';
  
  const students = ref<Student[]>([]);
  
  onMounted(() => {
    StudentService.getStudents()
      .then(response => {
        students.value = response.data;
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  });
  </script>
  
  <template>
    <div>
      <h1>Student List</h1>
      <div class="student-cards">
        <StudentCard v-for="student in students" :key="student.id" :student="student" />
      </div>
    </div>
  </template>
  
  <style scoped>
  .student-cards {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  