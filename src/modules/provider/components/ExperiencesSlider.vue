<template>
  <div v-if="jobs.length">
    <b-row>
      <b-col cols="12" lg="4" class="data">
        <hooper group="group1" :settings="hooperNoEvents">
          <slide v-for="item in jobs" :key="item.id">
            <h3 class="title">{{item.job_location}},</h3>
            <div class="description">{{item.job_description}}</div>
            <h3 class="employer-name">{{item.employer_name}}</h3>
            <div class="employer-title muted">{{item.employer_title}}</div>
            <div class="icon-card">
              <svg-icon name="icon_contact_phone" class="icon-card-icon"/>
              <div class="muted">{{item.employer_phone}}</div>
            </div>
          </slide>

          <hooper-navigation slot="hooper-addons">
            <svg-icon name="arrow_prev" slot="hooper-prev"/>
            <svg-icon name="arrow_next" slot="hooper-next"/>
          </hooper-navigation>
        </hooper>
      </b-col>
      <b-col cols="12" lg="8" class="images">
        <div class="images-container">
          <hooper group="group1" ref="jobSlider"
                  @updated="onJobSliderUpdated"
                  @beforeSlide="onJobSliderBeforeSlide"
                  @slide="onJobSliderSlide"
                  :settings="hooperNoEvents"
                  class="main-slider">
            <slide v-for="item in jobs" :key="'_' + item.id">
              <hooper :itemsToShow="$screens({ default: 1.5, lg: 2.25 })"
                      ref="jobImagesSlider"
                      class="inner-slider">
                <slide v-for="image in item.images.data" :key="image.id">
                  <div class="bg-image" :style="image.url | bgImage"></div>
                </slide>
                <slide v-if="!item.images.data.length">
                  <div class="bg-image-empty"></div>
                </slide>
              </hooper>
            </slide>
          </hooper>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<style scoped lang="scss" src="./ExperiencesSlider.scss"></style>

<script>
  import { Hooper, Navigation as HooperNavigation, Slide } from 'hooper';
  import 'hooper/dist/hooper.css';

  export default {
    components: { Hooper, Slide, HooperNavigation },
    props: {
      value: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        hooperNoEvents: {
          mouseDrag: false,
          touchDrag: false,
          wheelControl: false,
          keysControl: false,
          shortDrag: false,
        },
        jobs: this.value,
      }
    },
    watch: {
      value(v) {
        this.jobs = v || [];

        const _this = this;
        setTimeout(() => {
          _this.updateImagesSlidersWidth();
        }, 200);
      },
    },
    methods: {
      updateImagesSlidersWidth() {
        this.$refs.jobImagesSlider?.forEach(item => item.updateWidth())
      },
      onJobSliderBeforeSlide(e) {
        if (e.slideTo !== undefined) {
          console.log('fixme: onJobSliderBeforeSlide I\'m working now')
        }

        this.$refs.jobImagesSlider?.forEach((item, index) => {
          if (index !== e.currentSlide) {
            item.slideTo(0)
          }
        });
      },
      onJobSliderSlide(e) {
        const imagesSlider = this.$refs.jobImagesSlider?.[e.slideFrom];
        imagesSlider?.slideTo(imagesSlider?.slidesCount - 1);
      },
      onJobSliderUpdated() {
        const _this = this;
        setTimeout(() => {
          _this.updateImagesSlidersWidth();
        }, 200);
      }
    }
  }
</script>
