<template>
  <b-card>
    <b-media no-body>
      <b-media-aside
        style="width: 79px"
        class="justify-content-center"
        vertical-align="center"
      >
        <slot name="icon"></slot>
      </b-media-aside>
      <b-media-body>
        <h5><slot name="title"></slot></h5>
        <slot></slot>
      </b-media-body>
    </b-media>
  </b-card>
</template>
