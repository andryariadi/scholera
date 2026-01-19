import { Day, UserSex } from "@/generated/prisma/enums";
import prisma from "@/libs/config/prisma";

async function main() {
  // ADMIN
  await prisma.admin.create({
    data: {
      id: "admin1",
      username: "admin1",
    },
  });
  await prisma.admin.create({
    data: {
      id: "admin2",
      username: "admin2",
    },
  });

  // GRADE - Simpan UUID untuk digunakan nanti
  const grades = [];
  for (let i = 1; i <= 6; i++) {
    const grade = await prisma.grade.create({
      data: {
        level: i,
      },
    });
    grades.push(grade);
  }

  // CLASS - Simpan UUID untuk digunakan nanti
  const classes = [];
  for (let i = 1; i <= 6; i++) {
    const classItem = await prisma.class.create({
      data: {
        name: `${i}A`,
        gradeId: grades[i - 1].id, // Gunakan UUID dari grades
        capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
      },
    });
    classes.push(classItem);
  }

  // SUBJECT - Simpan UUID untuk digunakan nanti
  const subjectData = [
    { name: "Mathematics" },
    { name: "Science" },
    { name: "English" },
    { name: "History" },
    { name: "Geography" },
    { name: "Physics" },
    { name: "Chemistry" },
    { name: "Biology" },
    { name: "Computer Science" },
    { name: "Art" },
  ];

  const subjects = [];
  for (const subject of subjectData) {
    const createdSubject = await prisma.subject.create({ data: subject });
    subjects.push(createdSubject);
  }

  // TEACHER - Simpan UUID untuk digunakan nanti
  const teachers = [];
  for (let i = 1; i <= 15; i++) {
    const teacher = await prisma.teacher.create({
      data: {
        id: `teacher${i}`, // Tetap bisa custom ID
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        img: `https://i.pravatar.cc/150?img=${i}`, // Random avatar
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: subjects[i % 10].id }] }, // Gunakan UUID
        classes: { connect: [{ id: classes[i % 6].id }] }, // Gunakan UUID
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
      },
    });
    teachers.push(teacher);
  }

  // PARENT - Simpan UUID untuk digunakan nanti
  const parents = [];
  for (let i = 1; i <= 25; i++) {
    const parent = await prisma.parent.create({
      data: {
        id: `parentId${i}`,
        username: `parentId${i}`,
        name: `PName ${i}`,
        surname: `PSurname ${i}`,
        email: `parent${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
      },
    });
    parents.push(parent);
  }

  // LESSON - Simpan UUID untuk digunakan nanti
  const lessons = [];
  for (let i = 1; i <= 30; i++) {
    const lesson = await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: Day[Object.keys(Day)[Math.floor(Math.random() * Object.keys(Day).length)] as keyof typeof Day],
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 3)),
        subjectId: subjects[i % 10].id, // Gunakan UUID
        classId: classes[i % 6].id, // Gunakan UUID
        teacherId: teachers[i % 15].id, // Gunakan UUID
      },
    });
    lessons.push(lesson);
  }

  // STUDENT - Simpan UUID untuk digunakan nanti
  const students = [];
  for (let i = 1; i <= 50; i++) {
    const student = await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname ${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        img: `https://i.pravatar.cc/150?img=${20 + i}`, // Random avatar (offset untuk berbeda dari teacher)
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: parents[(Math.ceil(i / 2) % 25 || 25) - 1].id, // Gunakan UUID
        gradeId: grades[i % 6].id, // Gunakan UUID
        classId: classes[i % 6].id, // Gunakan UUID
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      },
    });
    students.push(student);
  }

  // EXAM - Simpan UUID untuk digunakan nanti
  const exams = [];
  for (let i = 1; i <= 10; i++) {
    const exam = await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        lessonId: lessons[i % 30].id, // Gunakan UUID
      },
    });
    exams.push(exam);
  }

  // ASSIGNMENT - Simpan UUID untuk digunakan nanti
  const assignments = [];
  for (let i = 1; i <= 10; i++) {
    const assignment = await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(new Date().setHours(new Date().getHours() + 1)),
        dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
        lessonId: lessons[i % 30].id, // Gunakan UUID
      },
    });
    assignments.push(assignment);
  }

  // RESULT
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: 90,
        studentId: students[i - 1].id, // Gunakan UUID
        ...(i <= 5
          ? { examId: exams[i - 1].id } // Gunakan UUID
          : { assignmentId: assignments[i - 6].id }), // Gunakan UUID
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: true,
        studentId: students[i - 1].id, // Gunakan UUID
        lessonId: lessons[i % 30].id, // Gunakan UUID
      },
    });
  }

  // EVENT
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(new Date().setHours(new Date().getHours() + 1)),
        endTime: new Date(new Date().setHours(new Date().getHours() + 2)),
        classId: classes[i % 5].id, // Gunakan UUID
      },
    });
  }

  // ANNOUNCEMENT
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: classes[i % 5].id, // Gunakan UUID
      },
    });
  }

  console.log("Seeding completed successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
