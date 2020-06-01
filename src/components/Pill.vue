<template lang="html">
  <div class="pill">
    <span class="name">{{ name }}</span>
    <span class="amount">{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: "Pill",
  props: ["name", "amount"]
};
</script>

<style lang="css">
.pill {
  margin: 10px;
  height: 55px;
  border-radius: 30px;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  background-color: #dc143c;

  display: flex;
  align-items: center;
}

.pill .name {
  margin-left: 15px;
}

.pill .amount {
  margin: 10px;
  padding: 5px;
  height: 35px;
  width: 35px;
  border-radius: 18px;

  background-color: #fff;
  color: #dc143c;

  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
