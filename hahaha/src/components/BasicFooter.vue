<script setup>

</script>

<template>
  <main>
    <footer>
      <div class="footer-content">
        <p>&copy; 2025 VISIER. All rights reserved.</p>
        <nav>
          <ul>
            <li><a href="#privacy-policy">Privacy Policy</a></li>
            <li><a href="#terms-of-service">Terms of Service</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  </main>
</template>

<style scoped>
.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
}

.footer-content p {
  margin: 0;
}

.footer-content nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
}

.footer-content nav ul li {
  margin: 0;
}

.footer-content nav ul li a {
  color: #fff;
  text-decoration: none;
}

.footer-content nav ul li a:hover {
  text-decoration: underline;
}
</style>
