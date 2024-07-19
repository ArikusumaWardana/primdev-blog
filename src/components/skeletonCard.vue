<template>
    <div class="skeleton-loader-card">
      <div class="skeleton-loader-image"></div>
      <div class="skeleton-loader-content">
        <div class="skeleton-loader-title"></div>
        <div class="skeleton-loader-text"></div>
        <div class="skeleton-loader-text mb-2"></div>
      </div>
    </div>
  </template>
  
  <style scoped>
  @keyframes pulse {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
  
  .skeleton-loader-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #e0e0e0; /* Light mode border color */
    border-radius: 8px;
    overflow: hidden;
  }
  
  .skeleton-loader-image {
    height: 200px;
    background-color: #e0e0e0; /* Light mode */
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: pulse 1.5s infinite ease-in-out;
  }
  
  .skeleton-loader-content {
    padding: 16px;
  }
  
  .skeleton-loader-title {
    height: 24px;
    background-color: #e0e0e0; /* Light mode */
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: pulse 1.5s infinite ease-in-out;
    margin-bottom: 8px;
  }
  
  .skeleton-loader-text {
    height: 16px;
    background-color: #e0e0e0; /* Light mode */
    background-image: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: pulse 1.5s infinite ease-in-out;
    margin-bottom: 8px;
  }
  
  .dark .skeleton-loader-image {
    background-color: #4a4a4a; /* Dark mode */
    background-image: linear-gradient(90deg, #6a6a6a 25%, #4a4a4a 50%, #6a6a6a 75%);
  }
  
  .dark .skeleton-loader-title,
  .dark .skeleton-loader-text {
    background-color: #4a4a4a; /* Dark mode */
    background-image: linear-gradient(90deg, #6a6a6a 25%, #4a4a4a 50%, #6a6a6a 75%);
  }
  
  @media (max-width: 640px) {
    .skeleton-loader-image {
      height: 160px;
    }
  }
  </style>
  