<template>
  <div>
    <b-row>
      <b-col md="4">
        <b-form-datepicker />
      </b-col>
    </b-row>
    <b-row>
      <b-col md="12 mt-3">
        <table class="table">
          <tbody>
            <tr>
              <th>Team Member</th>
              <th>Working Time</th>
              <th>Break Time</th>
              <th>Total</th>
            </tr>
            <tr>
              <td>
                <b-input></b-input>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <td>
              <b-icon icon="play" aria-hidden="true" variant="success" class="mr-2"></b-icon>Utopia Highschool
            </td>
            <td>08:00 AM - 10:53 AM</td>
            <td>08:00 AM - 10:53 AM</td>
            <td>00:02:53</td>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </div>
</template>