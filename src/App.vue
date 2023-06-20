<template>
  <div id="app">
    <!-- Navigation panels -->
    <div
      class="z-10 bg-white border-t-2 fixed bottom-0 inset-x-0 w-full flex flex-wrap justify-items-stretch md:block md:left-0 md:inset-y-0 md:w-16 xl:w-[244px] h-[48px] md:h-screen border-solid md:border-r-2 md:border-y-0"
    >
      <div
        class="w-full h-48 flex flex-wrap justify-items-center md:block md:h-screen md:w-12 xl:w-[244px]"
      >
        <div
          class="h-48 md:h-[692px] w-full md:w-12 xl:w-[244px] flex flex-wrap md:p-2 border-hidden border-[1px] border-gray-300"
        >
          <div
            class="w-full h-48 flex flex-wrap justify-around md:block md:w-12 xl:w-[220px] md:h-[620px] border-hidden border-[1px] border-gray-300"
          >
            <router-link to="/">
              <div
                class="md:hover:bg-gray-100 md:h-12 md:w-12 xl:w-[220px] md:rounded-full"
                href="/"
              >
                <div
                  class="flex flex-wrap items-center justify-center h-12 md:w-12 xl:w-[220px] border-hidden border-[1px] border-gray-300 md:my-2 md:p-3"
                >
                  <div class="flex items-center h-6 md:w-full">
                    <div class="w-6 h-6 xl:mr-4">
                      <img src="/images/nav_logos/home.png" />
                    </div>
                    <div class="hidden xl:flex h-6">Home</div>
                  </div>
                </div>
              </div></router-link
            >

            <router-link to="/coverage">
              <div
                class="md:hover:bg-gray-100 md:h-12 md:w-12 xl:w-[220px] md:rounded-full"
                href="/"
              >
                <div
                  class="flex flex-wrap items-center justify-center h-12 md:w-12 xl:w-[220px] border-hidden border-[1px] border-gray-300 md:my-2 md:p-3"
                >
                  <div class="flex items-center h-6 md:w-full">
                    <div class="w-6 h-6 xl:mr-4">
                      <img src="/images/nav_logos/search.png" />
                    </div>
                    <div class="hidden xl:flex h-6">Coverage Overview</div>
                  </div>
                </div>
              </div></router-link
            >
          </div>
        </div>
      </div>
    </div>

    <div
      class="h-screen bg-gradient-to-br from- from-[#1E1E1E] via-gray-700 to-pink-400 scrollbar-hide z-0 overflow-y-auto hover:overflow-scroll fixed flex justify-center left-0 md:left-16 xl:left-[244px] right-0 w-auto border-solid border-0"
    >
      <!-- Main content -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
