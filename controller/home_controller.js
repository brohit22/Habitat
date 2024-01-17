import { Habit } from '../model/habit.model.js';

function getTodayDate() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let today = day + '/' + month + '/' + year;
  return today;
}

function getOneWeekDate() {
  let arr = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    let mm = d.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
    let dd = d.getDate();
    if (dd < 10) dd = '0' + dd;
    const yyyy = d.getFullYear();
    arr.push(dd + '/' + mm + '/' + yyyy);
  }
  return arr;
}

export const habitController = {
  load: async (request, response) => {
    try {
      const habits = await Habit.find({});
      return response.render('home', { habits: habits });
    } catch (err) {
      console.error('Error fetching habits from the database:', err);
    }
  },

  add: async (request, response) => {
    try {
      request.body.record_tracker = {};
      request.body.user = 'AnyUser';
      request.body.dates = { date: await getTodayDate(), complete: 'none' };

      console.log(request.body);

      const newHabit = await Habit.create(request.body);
      newHabit.save();

      return response.redirect('back');
    } catch (err) {
      console.error('Error creating a habit:', err);
    }
  },

  delete: async (request, response) => {
    try {
      let id = request.query.id;
      await Habit.findByIdAndDelete(id);
      return response.redirect('back');
    } catch (error) {
      console.log(error);
    }
  },

  viewhabit: async (request, response) => {
    try {
      let id = request.query.id;
      const habits = await Habit.findById(id);
      const habit = await Habit.find({ _id: id });
      console.log('view habit ' + habit.habitName);

      response.render('habit.ejs', {
        habit: habit,
        habits: habits,
        weeklyDate: await getOneWeekDate(),
      });
    } catch (error) {
      console.log(error);
    }
  },

  fetchhabit: async function (request, response) {
    try {
      let id = request.query.id;
      const habit = await Habit.findById(id);

      response.setHeader('Content-Type', 'application/json');
      response.json(habit);
    } catch (err) {
      console.error('Error finding the habit:', err);
    }
  },

  updateDates: async (req, res) => {
    try {
      var d = req.query.date;
      var id = req.query.id;
      const habits = await Habit.findById(id);
      let dates = habits.dates;
      let found = false;

      dates.find((item, index) => {
        if (item.date === d) {
          item.complete =
            item.complete === 'yes'
              ? 'no'
              : item.complete === 'no'
              ? 'none'
              : 'yes';
          found = true;
        }
      });

      if (!found) {
        dates.push({ date: d, complete: 'yes' });
      }

      habits.dates = dates;
      await habits.save();

      res.redirect('back');
    } catch (error) {
      console.log('error insider updatesDate: ' + error);
    }
  },
};
