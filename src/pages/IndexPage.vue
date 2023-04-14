<script setup>
// Components
import BcSlider from 'components/BcSlider.vue'

import { ref, computed, watch, onMounted } from 'vue'

// Request
const api = 'https://products.aspose.app/barcode/embed/image.'
const extension = ref('Svg')
const fileParams = ref({
  BarcodeType: 'QR',
  Content: 'Test',
  size: 400
})
const url = computed(() => {
  let params = new URLSearchParams({
    ...fileParams.value,
    ...{
      Width: fileParams.value.size,
      Height: fileParams.value.size
    }
  })
  return `${api}${extension.value}?${params}`
})

// Styles
import { useQuasar } from 'quasar'
const $q = useQuasar()

const barcodeWrapperStyle = computed(() => {
  let barcodeWrapperStyle = {
    width: `${fileParams.value.size}px`,
    height: `${fileParams.value.size}px`
  }

  if ($q.screen.lt.md) {
    barcodeWrapperStyle = {
      width: '100%',
      height: '100%'
    }
  }

  return barcodeWrapperStyle
})

// Swagger Params
import { barcode } from 'boot/axios'
const barcodeTypes = ref([])
const fileExtensions = ref([])
const getBarcodeParams = async () => {
  let res = await barcode.get('/embed/swagger/v1/swagger.json')

  let encodeBarcodeType = res?.data?.components?.schemas?.EncodeBarcodeType?.enum
  barcodeTypes.value = encodeBarcodeType ? encodeBarcodeType : []

  let availableImageFileExtension = res?.data?.components?.schemas?.AvailableImageFileExtension?.enum
  fileExtensions.value = availableImageFileExtension ? availableImageFileExtension : []
}
onMounted(() => {
  getBarcodeParams()
})

// Reactive / by button
const reactiveGenerate = ref(true)
const buttonUrl = ref('')
const urlToButtonUrl = () => {
  buttonUrl.value = url.value
}
watch(
  () => reactiveGenerate.value,
  (val) => {
    urlToButtonUrl()
  }
)

</script>
<template>
  <q-page class="flex justify-center">
    <div class="bc-page-wrapper q-pt-md">
      <div class="bc-page-settings row">
        <div class="col-12 q-px-lg">
          <q-input
            label="Text"
            v-model="fileParams.Content"
          />
        </div>

        <div class="col-xs-12 col-md-6 q-px-lg">
          <q-select
            label="Extension"
            v-model="extension"
            :options="fileExtensions"
          />
        </div>
        <div class="col-xs-12 col-md-6 q-px-lg">
          <q-select
            label="Type"
            v-model="fileParams.BarcodeType"
            :options="barcodeTypes"
          />
        </div>

        <div class="row col-12 items-center q-px-lg q-py-md">
          <bc-slider
            label="Size"
            v-model="fileParams.size"
          />
        </div>
        <div class="row justify-between col-12 items-center q-px-md q-py-md">
          <div>
            <q-toggle
              v-model="reactiveGenerate"
              :label="reactiveGenerate ? 'Reactive' : 'By button'"
            />
          </div>
          <div v-if="!reactiveGenerate">
            <q-btn
              @click="urlToButtonUrl"
              flat
              color="primary"
              label="Generate"
            />
          </div>
          <div>
            <q-btn
              :href="url"
              target="_blank"
              download
              flat
              color="primary"
              label="Download"
            />
          </div>
        </div>
      </div>

      <div class="row justify-center q-pa-md">
        <div :style="barcodeWrapperStyle">
          <img
            v-if="reactiveGenerate"
            alt="barcode from Aspose"
            class="bc-image"
            :src="url"
          >
          <img
            v-if="!reactiveGenerate && buttonUrl.length"
            alt="barcode from Aspose"
            class="bc-image"
            :src="buttonUrl"
          >
        </div>
      </div>
    </div>
  </q-page>
</template>
