// Global variables to store data
let allProblems = [];
let companies = new Set();
let topics = new Set();
let timePeriods = new Set();
let completedProblems = new Set();
let revisionProblems = new Set();

// List of all available companies in the question folder
const availableCompanies = [
    'AMD', 'Accenture', 'Accolite', 'Adobe', 'Affirm', 'Agoda', 'Airbnb', 'Airtel', 'Akamai', 'Akuna Capital',
    'Alibaba', 'Altimetrik', 'Amazon', 'Amdocs', 'American Express', 'Anduril', 'Apple', 'Arcesium', 'Arista Networks',
    'Atlassian', 'Attentive', 'Autodesk', 'Avito', 'BNY Mellon', 'BP', 'Baidu', 'Barclays', 'BitGo', 'BlackRock',
    'Blizzard', 'Block', 'Bloomberg', 'Bolt', 'Booking.com', 'Box', 'ByteDance', 'CARS24', 'Cadence', 'Capgemini',
    'Capital One', 'Cashfree', 'Chewy', 'Cisco', 'Citadel', 'Citrix', 'Cloudera', 'Cloudflare', 'Cognizant',
    'Coinbase', 'Commvault', 'Confluent', 'ConsultAdd', 'Coupang', 'Coursera', 'CrowdStrike', 'Cruise', 'CureFit',
    'DE Shaw', 'DP world', 'DRW', 'Darwinbox', 'Databricks', 'Datadog', 'Deliveroo', 'Dell', 'Deloitte',
    'Deutsche Bank', 'DevRev', 'Directi', 'Disney', 'Docusign', 'DoorDash', 'Dream11', 'Dropbox', 'Dunzo',
    'EPAM Systems', 'Epic Systems', 'Expedia', 'FactSet', 'Flexport', 'Flipkart', 'FreshWorks', 'GE Healthcare',
    'GSN Games', 'Geico', 'Gojek', 'Goldman Sachs', 'Google', 'Grab', 'Grammarly', 'Graviton', 'Groww', 'HCL',
    'HPE', 'HashedIn', 'Huawei', 'Hubspot', 'Hudson River Trading', 'Hulu', 'IBM', 'IMC', 'IXL', 'InMobi',
    'Indeed', 'Infosys', 'Instacart', 'Intel', 'Intuit', 'J.P. Morgan', 'Jane Street', 'Jump Trading', 'Juspay',
    'KLA', 'Karat', 'LinkedIn', 'LiveRamp', 'Lowe\'s', 'Lucid', 'Lyft', 'MakeMyTrip', 'Mastercard', 'MathWorks',
    'Media.net', 'Meesho', 'Mercari', 'Meta', 'Microsoft', 'Millennium', 'Mitsogo', 'Moloco', 'MongoDB',
    'Morgan Stanley', 'Moveworks', 'Myntra', 'Nagarro', 'NetApp', 'Netflix', 'Nextdoor', 'Niantic', 'Nielsen',
    'Nike', 'Nordstrom', 'Nutanix', 'Nvidia', 'OKX', 'Okta', 'OpenAI', 'Oracle', 'Otter.ai', 'Ozon',
    'Palantir Technologies', 'Palo Alto Networks', 'PayPal', 'Paytm', 'PhonePe', 'Pinterest', 'Pocket Gems',
    'Point72', 'PornHub', 'Pure Storage', 'Qualcomm', 'Quora', 'RBC', 'Rakuten', 'Reddit', 'Revolut', 'Ripple',
    'Rippling', 'Robinhood', 'Roblox', 'Roku', 'Rubrik', 'SAP', 'SIG', 'Salesforce', 'Samsara', 'Samsung',
    'ServiceNow', 'Shopee', 'Shopify', 'Siemens', 'Sigmoid', 'Snap', 'Snowflake', 'SoFi', 'Splunk', 'Spotify',
    'Sprinklr', 'Squarepoint Capital', 'Stripe', 'Swiggy', 'Tekion', 'Tencent', 'Tesla', 'ThoughtWorks', 'TikTok',
    'Tinkoff', 'Trilogy', 'Turing', 'Turo', 'Twilio', 'Twitch', 'Two Sigma', 'UKG', 'Uber', 'UiPath', 'VK',
    'VMware', 'Veeva Systems', 'Verily', 'Verkada', 'Virtu Financial', 'Visa', 'Walmart Labs', 'Warnermedia',
    'Wayfair', 'Wells Fargo', 'Wipro', 'Wix', 'Workday', 'X', 'Yahoo', 'Yandex', 'Yelp', 'ZS Associates',
    'ZScaler', 'Zalando', 'Zenefits', 'Zepto', 'Zeta', 'Zillow', 'Zoho', 'Zomato', 'Zopsmart', 'athenahealth',
    'carwale', 'eBay', 'jio', 'josh technology', 'opentext', 'oyo', 'persistent systems', 'razorpay', 'tcs', 'thoughtspot'
];

// List of time periods available for each company
const availableTimePeriods = [
    '1. Thirty Days',
    '2. Three Months', 
    '3. Six Months',
    '4. More Than Six Months',
    '5. All'
];

// Load completed problems from localStorage if available
function loadCompletedProblems() {
    const saved = localStorage.getItem('completedLeetCodeProblems');
    if (saved) {
        const savedArray = JSON.parse(saved);
        completedProblems = new Set(savedArray);
    }
}

// Save completed problems to localStorage
function saveCompletedProblems() {
    localStorage.setItem('completedLeetCodeProblems', JSON.stringify([...completedProblems]));
}

// Load revision problems from localStorage if available
function loadRevisionProblems() {
    const saved = localStorage.getItem('revisionLeetCodeProblems');
    if (saved) {
        const savedArray = JSON.parse(saved);
        revisionProblems = new Set(savedArray);
    }
}

// Save revision problems to localStorage
function saveRevisionProblems() {
    localStorage.setItem('revisionLeetCodeProblems', JSON.stringify([...revisionProblems]));
}

// Helper function to check storage quota and availability
function checkStorageQuota() {
    // For browsers that support the Storage API
    if (navigator.storage && navigator.storage.estimate) {
        return navigator.storage.estimate().then(estimate => {
            const percentUsed = (estimate.usage / estimate.quota) * 100;
            const remaining = estimate.quota - estimate.usage;
            return {
                quota: estimate.quota,
                usage: estimate.usage,
                percentUsed: percentUsed,
                remaining: remaining
            };
        });
    } else {
        // Fallback for browsers without Storage API
        // Estimate based on localStorage size
        let totalSize = 0;
        for (const key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                totalSize += (localStorage[key].length + key.length) * 2; // UTF-16 uses 2 bytes per char
            }
        }
        
        // Rough estimate - most browsers have around 5-10MB limit
        const estimatedQuota = 5 * 1024 * 1024; // 5MB
        const percentUsed = (totalSize / estimatedQuota) * 100;
        
        return Promise.resolve({
            quota: estimatedQuota, 
            usage: totalSize,
            percentUsed: percentUsed,
            remaining: estimatedQuota - totalSize
        });
    }
}

// Save all problem data to localStorage with compression if needed
function saveAllData() {
    try {
        // First attempt - save without compression
        localStorage.setItem('leetCodeProblems', JSON.stringify(allProblems));
        localStorage.setItem('leetCodeCompanies', JSON.stringify([...companies]));
        localStorage.setItem('leetCodeTopics', JSON.stringify([...topics]));
        localStorage.setItem('leetCodeTimePeriods', JSON.stringify([...timePeriods]));
        localStorage.setItem('leetCodeLastSaved', new Date().toISOString());
        
        console.log(`Saved ${allProblems.length} problems to localStorage`);
        return true;
    } catch (error) {
        // If storage quota exceeded, try with fewer problems
        console.warn('Storage quota exceeded, trying with fewer problems');
        
        if (allProblems.length > 500) {
            try {
                // Try saving just 500 problems with highest frequency
                const sortedProblems = [...allProblems].sort((a, b) => {
                    const freqA = parseFloat(a.Frequency) || 0;
                    const freqB = parseFloat(b.Frequency) || 0;
                    return freqB - freqA; // Descending order
                });
                
                const reducedProblems = sortedProblems.slice(0, 500);
                localStorage.setItem('leetCodeProblems', JSON.stringify(reducedProblems));
                localStorage.setItem('leetCodeCompanies', JSON.stringify([...companies]));
                localStorage.setItem('leetCodeTopics', JSON.stringify([...topics]));
                localStorage.setItem('leetCodeTimePeriods', JSON.stringify([...timePeriods]));
                localStorage.setItem('leetCodeLastSaved', new Date().toISOString());
                localStorage.setItem('leetCodeDataTruncated', 'true');
                
                console.warn(`Saved ${reducedProblems.length} out of ${allProblems.length} problems (data truncated)`);
                return true;
            } catch (error) {
                console.error('Failed to save reduced data set:', error);
                return false;
            }
        }
        
        console.error('Failed to save data to localStorage:', error);
        return false;
    }
}

// Load all problem data from localStorage
function loadAllData() {
    try {
        const savedProblems = localStorage.getItem('leetCodeProblems');
        const savedCompanies = localStorage.getItem('leetCodeCompanies');
        const savedTopics = localStorage.getItem('leetCodeTopics');
        const savedTimePeriods = localStorage.getItem('leetCodeTimePeriods');
        const lastSaved = localStorage.getItem('leetCodeLastSaved');
        const dataTruncated = localStorage.getItem('leetCodeDataTruncated') === 'true';
        
        if (savedProblems && savedCompanies && savedTopics && savedTimePeriods) {
            // Restore problems array
            allProblems = JSON.parse(savedProblems);
            
            // Restore sets
            companies = new Set(JSON.parse(savedCompanies));
            topics = new Set(JSON.parse(savedTopics));
            timePeriods = new Set(JSON.parse(savedTimePeriods));
            
            console.log(`Loaded ${allProblems.length} problems from localStorage`);
            
            // Show warning if data was truncated
            if (dataTruncated) {
                console.warn('Note: Only a subset of problems was saved due to storage limitations');
                updateUploadStatus('Note: Only high-frequency problems are saved due to storage limitations', true);
            }
            
            // Show when data was last saved
            if (lastSaved) {
                const savedDate = new Date(lastSaved);
                const now = new Date();
                const timeDiff = Math.round((now - savedDate) / (1000 * 60)); // minutes
                
                if (timeDiff < 60) {
                    console.log(`Data was saved ${timeDiff} minutes ago`);
                } else if (timeDiff < 24 * 60) {
                    console.log(`Data was saved ${Math.round(timeDiff / 60)} hours ago`);
                } else {
                    console.log(`Data was saved ${Math.round(timeDiff / (60 * 24))} days ago`);
                }
            }
            
            return true;
        }
        return false;
    } catch (error) {
        console.error('Failed to load data from localStorage:', error);
        return false;
    }
}

// Parse CSV content
function parseCSV(csv) {
    const lines = csv.split('\n');
    
    // Find the header line (skipping any comment lines)
    let headerIndex = 0;
    while (headerIndex < lines.length && (lines[headerIndex].trim().startsWith('//') || lines[headerIndex].trim() === '')) {
        headerIndex++;
    }
    
    if (headerIndex >= lines.length) return []; // No data found
    
    const headers = parseCSVLine(lines[headerIndex]);
    const results = [];
    
    for (let i = headerIndex + 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line || line.startsWith('//')) continue;
        
        const values = parseCSVLine(line);
        
        // Create object from headers and values
        const obj = {};
        headers.forEach((header, index) => {
            if (index < values.length) {
                obj[header.trim()] = values[index].trim();
            }
        });
        
        results.push(obj);
    }
    
    return results;
}

// Helper function to parse a single CSV line, handling quoted fields
function parseCSVLine(line) {
    const values = [];
    let currentValue = '';
    let insideQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
            // If we have a double quote inside quotes (escaped quote)
            if (insideQuotes && line[i + 1] === '"') {
                currentValue += '"';
                i++; // Skip the next quote
            } else {
                // Toggle quote mode
                insideQuotes = !insideQuotes;
            }
        } else if (char === ',' && !insideQuotes) {
            // End of field
            values.push(currentValue);
            currentValue = '';
        } else {
            currentValue += char;
        }
    }
    
    // Add the last value
    values.push(currentValue);
    
    return values;
}

// Analyze file structure to determine folder depth
function analyzeFolderStructure(files) {
    let maxDepth = 0;
    let depths = {};
    
    for (const file of files) {
        if (!file.name.endsWith('.csv')) continue;
        
        const pathParts = file.webkitRelativePath.split('/');
        const depth = pathParts.length;
        
        // Count occurrences of each depth
        depths[depth] = (depths[depth] || 0) + 1;
        
        if (depth > maxDepth) {
            maxDepth = depth;
        }
    }
    
    // Determine most common depth for CSV files
    let mostCommonDepth = 0;
    let maxCount = 0;
    
    for (const depth in depths) {
        if (depths[depth] > maxCount) {
            maxCount = depths[depth];
            mostCommonDepth = parseInt(depth);
        }
    }
    
    return {
        maxDepth,
        mostCommonDepth,
        depths
    };
}

// Extract information from file path based on folder structure
function extractFileInfo(filePath, folderAnalysis) {
    const pathParts = filePath.split('/');
    
    // Default values
    let company = "Unknown";
    let timePeriod = "Unknown";
    
    // Handle different folder structures based on depth analysis
    if (folderAnalysis.mostCommonDepth >= 3) {
        // Structure is likely /root/company/timeperiod.csv
        company = pathParts.length > 1 ? pathParts[1] : "Unknown";
        timePeriod = pathParts.length > 2 ? 
            pathParts[2].replace('.csv', '') : 
            (pathParts.length > 1 ? pathParts[1].replace('.csv', '') : "Unknown");
    } else {
        // Structure is likely /root/file.csv where file name might contain company info
        // Or some other custom structure
        
        // Use filename (without extension) as time period
        const fileName = pathParts[pathParts.length - 1].replace('.csv', '');
        
        // If we have at least a subfolder, use it as company name
        if (pathParts.length > 1) {
            company = pathParts[pathParts.length - 2];
            timePeriod = fileName;
        } else {
            // If no proper structure, just use the filename and try to extract meaningful info
            const parts = fileName.split(' - ');
            if (parts.length > 1) {
                company = parts[0];
                timePeriod = parts[1];
            } else {
                company = "Unknown";
                timePeriod = fileName;
            }
        }
    }
    
    return { company, timePeriod };
}

// Load data automatically from the question folder
async function loadDataFromQuestionFolder() {
    setLoading(true);
    
    // Clear previous data
    allProblems = [];
    companies.clear();
    topics.clear();
    timePeriods.clear();
    
    let successfulLoads = 0;
    let totalAttempts = 0;
    
    // Update status
    updateLoadingStatus('Loading problem data from companies...');
    
    for (const company of availableCompanies) {
        for (const timePeriod of availableTimePeriods) {
            try {
                totalAttempts++;
                const filePath = `question/${encodeURIComponent(company)}/${encodeURIComponent(timePeriod)}.csv`;
                
                // Fetch the CSV file
                const response = await fetch(filePath);
                
                if (response.ok) {
                    const csvContent = await response.text();
                    
                    // Only process if file has content beyond just headers
                    if (csvContent.trim().split('\n').length > 1) {
                        const problems = parseCSV(csvContent);
                        
                        if (problems.length > 0) {
                            successfulLoads++;
                            
                            // Add company and time period information
                            companies.add(company);
                            timePeriods.add(timePeriod);
                            
                            problems.forEach(problem => {
                                // Set company and time period
                                problem.Company = company;
                                problem.TimePeriod = timePeriod;
                                
                                // Extract topics if available
                                if (problem.Topics) {
                                    const problemTopics = problem.Topics.split(',').map(topic => topic.trim().replace(/"/g, ''));
                                    problemTopics.forEach(topic => topics.add(topic));
                                }
                                
                                // Store companies and time periods as arrays for each problem
                                problem.Companies = [company];
                                problem.TimePeriods = [timePeriod];
                            });
                            
                            // Check for duplicates and merge them instead of adding new entries
                            problems.forEach(problem => {
                                // Use Link or Title as unique identifier
                                const uniqueId = problem.Link || problem.Title;
                                if (!uniqueId) return; // Skip if no unique identifier
                                
                                // Check if this problem already exists
                                const existingIndex = allProblems.findIndex(p => 
                                    (p.Link && p.Link === problem.Link) || 
                                    (p.Title && p.Title === problem.Title)
                                );
                                
                                if (existingIndex >= 0) {
                                    // Merge with existing problem
                                    const existingProblem = allProblems[existingIndex];
                                    
                                    // Add company if not already in the list
                                    if (!existingProblem.Companies.includes(problem.Company)) {
                                        existingProblem.Companies.push(problem.Company);
                                    }
                                    
                                    // Add time period if not already in the list
                                    if (!existingProblem.TimePeriods.includes(problem.TimePeriod)) {
                                        existingProblem.TimePeriods.push(problem.TimePeriod);
                                    }
                                    
                                    // Update frequency if the new one is higher
                                    if (parseFloat(problem.Frequency) > parseFloat(existingProblem.Frequency || 0)) {
                                        existingProblem.Frequency = problem.Frequency;
                                    }
                                    
                                    // Merge topics if new ones are present
                                    if (problem.Topics && existingProblem.Topics) {
                                        const existingTopics = new Set(existingProblem.Topics.split(',').map(t => t.trim()));
                                        const newTopics = problem.Topics.split(',').map(t => t.trim());
                                        
                                        newTopics.forEach(topic => existingTopics.add(topic));
                                        existingProblem.Topics = Array.from(existingTopics).join(', ');
                                    } else if (problem.Topics) {
                                        existingProblem.Topics = problem.Topics;
                                    }
                                    
                                    // Use the highest acceptance rate
                                    const existingRate = parseFloat(existingProblem["Acceptance Rate"] || existingProblem.Acceptance_Rate || 0);
                                    const newRate = parseFloat(problem["Acceptance Rate"] || problem.Acceptance_Rate || 0);
                                    if (newRate > existingRate) {
                                        existingProblem["Acceptance Rate"] = problem["Acceptance Rate"];
                                        existingProblem.Acceptance_Rate = problem.Acceptance_Rate;
                                    }
                                } else {
                                    // Add new problem to the list
                                    allProblems.push(problem);
                                }
                            });
                        }
                    }
                }
            } catch (error) {
                // File doesn't exist or can't be loaded - this is expected for some companies
                // Don't log these as errors since not all companies have all time periods
            }
        }
        
        // Update progress
        if (successfulLoads > 0) {
            updateLoadingStatus(`Loaded ${successfulLoads} files from ${companies.size} companies...`);
        }
    }
    
    console.log(`Successfully loaded ${successfulLoads} files out of ${totalAttempts} attempts`);
    console.log(`Total problems: ${allProblems.length}`);
    
    // Save all data to localStorage
    const saveResult = saveAllData();
    if (!saveResult) {
        console.warn('Warning: Failed to save data to localStorage. Data will not persist after page refresh.');
        updateLoadingStatus('Warning: Data too large to save in browser storage. Data will not persist after page refresh.', true);
    }
    
    // Update filter options
    updateFilterOptions();
    
    // Display all problems initially
    filterProblems();
    
    setLoading(false);
    
    if (successfulLoads > 0) {
        updateLoadingStatus(`Successfully loaded ${allProblems.length} problems from ${companies.size} companies.`);
    } else {
        updateLoadingStatus('No problem data found. Make sure the question folder contains CSV files.', true);
    }
}

// Update loading status display
function updateLoadingStatus(message, isError = false) {
    const status = document.getElementById('loading-status');
    if (status) {
        status.textContent = message;
        status.className = isError ? 'error' : '';
    }
}

// Read file content as text (kept for potential future use)
function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsText(file);
    });
}

// Save all problem data to localStorage
function saveAllData() {
    try {
        // First attempt - save without compression
        localStorage.setItem('leetCodeProblems', JSON.stringify(allProblems));
        localStorage.setItem('leetCodeCompanies', JSON.stringify([...companies]));
        localStorage.setItem('leetCodeTopics', JSON.stringify([...topics]));
        localStorage.setItem('leetCodeTimePeriods', JSON.stringify([...timePeriods]));
        localStorage.setItem('leetCodeLastSaved', new Date().toISOString());
        
        console.log(`Saved ${allProblems.length} problems to localStorage`);
        return true;
    } catch (error) {
        // If storage quota exceeded, try with fewer problems
        console.warn('Storage quota exceeded, trying with fewer problems');
        
        if (allProblems.length > 500) {
            try {
                // Try saving just 500 problems with highest frequency
                const sortedProblems = [...allProblems].sort((a, b) => {
                    const freqA = parseFloat(a.Frequency) || 0;
                    const freqB = parseFloat(b.Frequency) || 0;
                    return freqB - freqA; // Descending order
                });
                
                const reducedProblems = sortedProblems.slice(0, 500);
                localStorage.setItem('leetCodeProblems', JSON.stringify(reducedProblems));
                localStorage.setItem('leetCodeCompanies', JSON.stringify([...companies]));
                localStorage.setItem('leetCodeTopics', JSON.stringify([...topics]));
                localStorage.setItem('leetCodeTimePeriods', JSON.stringify([...timePeriods]));
                localStorage.setItem('leetCodeLastSaved', new Date().toISOString());
                localStorage.setItem('leetCodeDataTruncated', 'true');
                
                console.warn(`Saved ${reducedProblems.length} out of ${allProblems.length} problems (data truncated)`);
                return true;
            } catch (error) {
                console.error('Failed to save reduced data set:', error);
                return false;
            }
        }
        
        console.error('Failed to save data to localStorage:', error);
        return false;
    }
}

// Load all problem data from localStorage
function loadAllData() {
    try {
        const savedProblems = localStorage.getItem('leetCodeProblems');
        const savedCompanies = localStorage.getItem('leetCodeCompanies');
        const savedTopics = localStorage.getItem('leetCodeTopics');
        const savedTimePeriods = localStorage.getItem('leetCodeTimePeriods');
        const lastSaved = localStorage.getItem('leetCodeLastSaved');
        const dataTruncated = localStorage.getItem('leetCodeDataTruncated') === 'true';
        
        if (savedProblems && savedCompanies && savedTopics && savedTimePeriods) {
            // Restore problems array
            allProblems = JSON.parse(savedProblems);
            
            // Restore sets
            companies = new Set(JSON.parse(savedCompanies));
            topics = new Set(JSON.parse(savedTopics));
            timePeriods = new Set(JSON.parse(savedTimePeriods));
            
            console.log(`Loaded ${allProblems.length} problems from localStorage`);
            
            // Show warning if data was truncated
            if (dataTruncated) {
                console.warn('Note: Only a subset of problems was saved due to storage limitations');
                updateUploadStatus('Note: Only high-frequency problems are saved due to storage limitations', true);
            }
            
            // Show when data was last saved
            if (lastSaved) {
                const savedDate = new Date(lastSaved);
                const now = new Date();
                const timeDiff = Math.round((now - savedDate) / (1000 * 60)); // minutes
                
                if (timeDiff < 60) {
                    console.log(`Data was saved ${timeDiff} minutes ago`);
                } else if (timeDiff < 24 * 60) {
                    console.log(`Data was saved ${Math.round(timeDiff / 60)} hours ago`);
                } else {
                    console.log(`Data was saved ${Math.round(timeDiff / (60 * 24))} days ago`);
                }
            }
            
            return true;
        }
        return false;
    } catch (error) {
        console.error('Failed to load data from localStorage:', error);
        return false;
    }
}

// Update filter dropdown options
function updateFilterOptions() {
    // Update company filter
    const companyFilter = document.getElementById('company-filter');
    companyFilter.innerHTML = '<option value="">All Companies</option>';
    Array.from(companies).sort().forEach(company => {
        const option = document.createElement('option');
        option.value = company;
        option.textContent = company;
        companyFilter.appendChild(option);
    });
    
    // Update time period filter
    const timePeriodFilter = document.getElementById('time-period-filter');
    timePeriodFilter.innerHTML = '<option value="">All Time Periods</option>';
    Array.from(timePeriods).sort().forEach(timePeriod => {
        const option = document.createElement('option');
        option.value = timePeriod;
        option.textContent = timePeriod;
        timePeriodFilter.appendChild(option);
    });
    
    // Update topic filter
    const topicFilter = document.getElementById('topic-filter');
    topicFilter.innerHTML = '<option value="">All Topics</option>';
    Array.from(topics).sort().forEach(topic => {
        const option = document.createElement('option');
        option.value = topic;
        option.textContent = topic;
        topicFilter.appendChild(option);
    });
}

// Show/hide loading indicator
function setLoading(isLoading) {
    const loadingIndicator = document.getElementById('loading-indicator');
    const table = document.getElementById('problems-table');
    const noDataMessage = document.getElementById('no-data-message');
    
    if (isLoading) {
        loadingIndicator.classList.add('visible');
        table.classList.remove('visible');
        noDataMessage.style.display = 'none';
    } else {
        loadingIndicator.classList.remove('visible');
        if (allProblems.length > 0) {
            table.classList.add('visible');
            noDataMessage.style.display = 'none';
        } else {
            table.classList.remove('visible');
            noDataMessage.style.display = 'block';
        }
    }
}

// Sort problems based on column and direction
function sortProblems(problems, sortColumn, sortDirection) {
    return [...problems].sort((a, b) => {
        let aValue, bValue;
        
        switch(sortColumn) {
            case 'company':
                aValue = (Array.isArray(a.Companies) ? a.Companies[0] : a.Company) || '';
                bValue = (Array.isArray(b.Companies) ? b.Companies[0] : b.Company) || '';
                break;
            case 'timePeriod':
                aValue = (Array.isArray(a.TimePeriods) ? a.TimePeriods[0] : a.TimePeriod) || '';
                bValue = (Array.isArray(b.TimePeriods) ? b.TimePeriods[0] : b.TimePeriod) || '';
                break;
            case 'difficulty':
                // Custom sort order for difficulty: HARD > MEDIUM > EASY
                const difficultyOrder = { 'HARD': 3, 'MEDIUM': 2, 'EASY': 1 };
                aValue = difficultyOrder[a.Difficulty] || 0;
                bValue = difficultyOrder[b.Difficulty] || 0;
                break;
            case 'title':
                aValue = a.Title || '';
                bValue = b.Title || '';
                break;
            case 'frequency':
                aValue = parseFloat(a.Frequency) || 0;
                bValue = parseFloat(b.Frequency) || 0;
                break;
            case 'acceptance':
                aValue = parseFloat(a["Acceptance Rate"] || a.Acceptance_Rate) || 0;
                bValue = parseFloat(b["Acceptance Rate"] || b.Acceptance_Rate) || 0;
                break;
            default:
                aValue = a[sortColumn] || '';
                bValue = b[sortColumn] || '';
        }
        
        // For string comparison
        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return sortDirection === 'asc' ? 
                aValue.localeCompare(bValue) : 
                bValue.localeCompare(aValue);
        }
        
        // For numeric comparison
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    });
}

// Update table header to show current sort
function updateSortHeader() {
    // Remove sort classes from all headers
    document.querySelectorAll('th.sortable').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    // Add appropriate sort class to current sort header
    const currentHeader = document.querySelector(`th.sortable[data-sort="${currentSortColumn}"]`);
    if (currentHeader) {
        currentHeader.classList.add(currentSortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
    }
}

// Global variables for sorting
let currentSortColumn = 'company';
let currentSortDirection = 'asc';

// Filter problems based on selected criteria
function filterProblems() {
    setLoading(true);
    
    // Use setTimeout to allow UI to update before heavy processing
    setTimeout(() => {
        const companyFilter = document.getElementById('company-filter').value;
        const difficultyFilter = document.getElementById('difficulty-filter').value;
        const timePeriodFilter = document.getElementById('time-period-filter').value;
        const topicFilter = document.getElementById('topic-filter').value;
        const minFrequency = parseFloat(document.getElementById('min-frequency').value) || 0;
        const minAcceptance = parseFloat(document.getElementById('min-acceptance').value) || 0;
        const showCompletedFilter = document.getElementById('show-completed').value;
        const showRevisionFilter = document.getElementById('show-revision') ? document.getElementById('show-revision').value : 'all';
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
        
        const filteredProblems = allProblems.filter(problem => {
            // Check company filter
            if (companyFilter) {
                if (Array.isArray(problem.Companies)) {
                    if (!problem.Companies.includes(companyFilter)) return false;
                } else if (problem.Company !== companyFilter) {
                    return false;
                }
            }
            
            // Check difficulty filter
            if (difficultyFilter && problem.Difficulty !== difficultyFilter) return false;
            
            // Check time period filter
            if (timePeriodFilter) {
                if (Array.isArray(problem.TimePeriods)) {
                    if (!problem.TimePeriods.includes(timePeriodFilter)) return false;
                } else if (problem.TimePeriod !== timePeriodFilter) {
                    return false;
                }
            }
            
            // Check topic filter
            if (topicFilter && (!problem.Topics || !problem.Topics.includes(topicFilter))) return false;
            
            // Check frequency filter
            if (minFrequency > 0) {
                const frequency = parseFloat(problem.Frequency);
                if (isNaN(frequency) || frequency < minFrequency) return false;
            }
            
            // Check acceptance rate filter
            if (minAcceptance > 0) {
                // Handle both "Acceptance Rate" and "Acceptance_Rate" field names
                const rateValue = problem["Acceptance Rate"] || problem.Acceptance_Rate;
                const acceptanceRate = parseFloat(rateValue) * 100;
                if (isNaN(acceptanceRate) || acceptanceRate < minAcceptance) return false;
            }
            
            // Check completed filter
            if (showCompletedFilter === 'completed' && !completedProblems.has(problem.Link)) return false;
            if (showCompletedFilter === 'not-completed' && completedProblems.has(problem.Link)) return false;
            
            // Check revision filter
            if (showRevisionFilter === 'revision' && !revisionProblems.has(problem.Link)) return false;
            if (showRevisionFilter === 'not-revision' && revisionProblems.has(problem.Link)) return false;
            
            // Check search query
            if (searchQuery) {
                const title = problem.Title?.toLowerCase() || '';
                
                // Handle company search in either Company string or Companies array
                let companyMatch = false;
                if (Array.isArray(problem.Companies)) {
                    companyMatch = problem.Companies.some(c => c.toLowerCase().includes(searchQuery));
                } else {
                    companyMatch = (problem.Company?.toLowerCase() || '').includes(searchQuery);
                }
                
                // Handle time period search
                let timeMatch = false;
                if (Array.isArray(problem.TimePeriods)) {
                    timeMatch = problem.TimePeriods.some(t => t.toLowerCase().includes(searchQuery));
                } else {
                    timeMatch = (problem.TimePeriod?.toLowerCase() || '').includes(searchQuery);
                }
                
                const topics = problem.Topics?.toLowerCase() || '';
                
                if (!title.includes(searchQuery) && 
                    !companyMatch && 
                    !timeMatch &&
                    !topics.includes(searchQuery)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Sort the filtered problems
        const sortedProblems = sortProblems(filteredProblems, currentSortColumn, currentSortDirection);
        
        displayProblems(sortedProblems);
        updateProblemCount(sortedProblems);
        updateSortHeader();
        setLoading(false);
    }, 0);
}

// Display filtered problems in the table
function displayProblems(problems) {
    const tableBody = document.getElementById('problems-body');
    tableBody.innerHTML = '';
    
    problems.forEach(problem => {
        const row = document.createElement('tr');
        
        // Checkbox for completed problems
        const doneCell = document.createElement('td');
        const doneCheckbox = document.createElement('input');
        doneCheckbox.type = 'checkbox';
        doneCheckbox.className = 'done-checkbox';
        doneCheckbox.checked = completedProblems.has(problem.Link);
        doneCheckbox.addEventListener('change', () => {
            if (doneCheckbox.checked) {
                completedProblems.add(problem.Link);
            } else {
                completedProblems.delete(problem.Link);
            }
            saveCompletedProblems();
            
            // No need to save all data since only completed status changed
            // and that's already being saved by saveCompletedProblems()
            
            updateProblemCount(problems);
        });
        doneCell.appendChild(doneCheckbox);
        row.appendChild(doneCell);
        
        // Button for revision problems
        const reviseCell = document.createElement('td');
        const reviseButton = document.createElement('button');
        reviseButton.className = 'revise-button';
        reviseButton.classList.toggle('marked', revisionProblems.has(problem.Link));
        reviseButton.innerHTML = reviseButton.classList.contains('marked') ? '★' : '☆';
        reviseButton.title = reviseButton.classList.contains('marked') ? 'Remove from revision' : 'Mark for revision';
        reviseButton.addEventListener('click', () => {
            if (revisionProblems.has(problem.Link)) {
                revisionProblems.delete(problem.Link);
                reviseButton.innerHTML = '☆';
                reviseButton.title = 'Mark for revision';
                reviseButton.classList.remove('marked');
            } else {
                revisionProblems.add(problem.Link);
                reviseButton.innerHTML = '★';
                reviseButton.title = 'Remove from revision';
                reviseButton.classList.add('marked');
            }
            saveRevisionProblems();
            updateProblemCount(problems);
        });
        reviseCell.appendChild(reviseButton);
        row.appendChild(reviseCell);
        
        // Company - show all companies that have this problem
        const companyCell = document.createElement('td');
        if (Array.isArray(problem.Companies)) {
            const companies = [...new Set(problem.Companies)]; // Remove duplicates
            companyCell.textContent = companies.join(', ');
        } else {
            companyCell.textContent = problem.Company || '';
        }
        row.appendChild(companyCell);
        
        // Time Period - show all time periods for this problem
        const timePeriodCell = document.createElement('td');
        if (Array.isArray(problem.TimePeriods)) {
            const timePeriods = [...new Set(problem.TimePeriods)]; // Remove duplicates
            timePeriodCell.textContent = timePeriods.join(', ');
        } else {
            timePeriodCell.textContent = problem.TimePeriod || '';
        }
        row.appendChild(timePeriodCell);
        
        // Difficulty
        const difficultyCell = document.createElement('td');
        difficultyCell.textContent = problem.Difficulty;
        difficultyCell.className = problem.Difficulty ? problem.Difficulty.toLowerCase() : '';
        row.appendChild(difficultyCell);
        
        // Title with link
        const titleCell = document.createElement('td');
        const titleLink = document.createElement('a');
        titleLink.href = problem.Link;
        titleLink.textContent = problem.Title;
        titleLink.className = 'problem-link';
        titleLink.target = '_blank';
        titleCell.appendChild(titleLink);
        row.appendChild(titleCell);
        
        // Frequency
        const frequencyCell = document.createElement('td');
        frequencyCell.textContent = problem.Frequency;
        row.appendChild(frequencyCell);
        
        // Acceptance Rate
        const acceptanceCell = document.createElement('td');
        const rateValue = problem["Acceptance Rate"] || problem.Acceptance_Rate;
        if (rateValue) {
            const rate = parseFloat(rateValue);
            acceptanceCell.textContent = rate ? `${(rate * 100).toFixed(1)}%` : '';
        }
        row.appendChild(acceptanceCell);
        
        // Topics
        const topicsCell = document.createElement('td');
        if (problem.Topics) {
            const topicsList = problem.Topics.split(',').map(topic => topic.trim());
            topicsList.forEach(topic => {
                const topicSpan = document.createElement('span');
                topicSpan.className = 'topic-tag';
                topicSpan.textContent = topic;
                topicsCell.appendChild(topicSpan);
            });
        }
        row.appendChild(topicsCell);
        
        tableBody.appendChild(row);
    });
}

// Update problem count information
function updateProblemCount(problems) {
    const problemCount = document.getElementById('problem-count');
    const completedCount = document.getElementById('completed-count');
    
    problemCount.textContent = `${problems.length} problems found`;
    
    const completed = problems.filter(p => completedProblems.has(p.Link)).length;
    const forRevision = problems.filter(p => revisionProblems.has(p.Link)).length;
    
    const completedPercent = Math.round(completed / problems.length * 100) || 0;
    const revisionPercent = Math.round(forRevision / problems.length * 100) || 0;
    
    completedCount.textContent = `${completed} completed (${completedPercent}%), ${forRevision} for revision (${revisionPercent}%)`;
}

// Export problems to CSV
function exportToCSV(problems) {
    if (problems.length === 0) {
        alert('No problems to export');
        return;
    }
    
    // Determine all possible headers from all problems
    const headers = new Set();
    problems.forEach(problem => {
        Object.keys(problem).forEach(key => headers.add(key));
    });
    
    // Always include these columns first if they exist
    const orderedHeaders = [
        'Company', 
        'TimePeriod', 
        'Difficulty', 
        'Title', 
        'Frequency', 
        'Acceptance Rate', 
        'Acceptance_Rate', 
        'Link', 
        'Topics'
    ].filter(h => headers.has(h));
    
    // Add any remaining headers
    headers.forEach(header => {
        if (!orderedHeaders.includes(header)) {
            orderedHeaders.push(header);
        }
    });
    
    // Create CSV content
    let csv = orderedHeaders.join(',') + '\n';
    
    problems.forEach(problem => {
        const row = orderedHeaders.map(header => {
            let value = problem[header] || '';
            
            // Handle arrays (Companies, TimePeriods)
            if (Array.isArray(value)) {
                value = value.join(', ');
            }
            
            // Escape quotes and wrap in quotes if needed
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                value = '"' + value.replace(/"/g, '""') + '"';
            }
            
            return value;
        });
        
        csv += row.join(',') + '\n';
    });
    
    // Create download link
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'leetcode_problems.csv');
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Show loading/status messages (replacing upload status)
function updateUploadStatus(message, isError = false) {
    // For backwards compatibility, redirect to updateLoadingStatus
    updateLoadingStatus(message, isError);
}

// Update storage status display
function updateStorageStatus() {
    const statusElement = document.getElementById('storage-status');
    if (!statusElement) return;
    
    // Check if we have saved data
    const hasProblems = localStorage.getItem('leetCodeProblems') !== null;
    const hasCompletedProblems = localStorage.getItem('completedLeetCodeProblems') !== null;
    const dataTruncated = localStorage.getItem('leetCodeDataTruncated') === 'true';
    const lastSaved = localStorage.getItem('leetCodeLastSaved');
    
    // Get approximate storage size
    let totalSize = 0;
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('leetCode')) {
            totalSize += localStorage.getItem(key).length;
        }
    }
    
    // Convert to KB or MB
    let sizeText = '';
    if (totalSize > 1024 * 1024) {
        sizeText = `${(totalSize / (1024 * 1024)).toFixed(2)} MB`;
    } else if (totalSize > 0) {
        sizeText = `${(totalSize / 1024).toFixed(2)} KB`;
    }
    
    // Last saved date
    let lastSavedText = '';
    if (lastSaved) {
        const savedDate = new Date(lastSaved);
        const now = new Date();
        const timeDiff = Math.round((now - savedDate) / (1000 * 60)); // minutes
        
        if (timeDiff < 1) {
            lastSavedText = 'just now';
        } else if (timeDiff < 60) {
            lastSavedText = `${timeDiff} minute${timeDiff !== 1 ? 's' : ''} ago`;
        } else if (timeDiff < 24 * 60) {
            const hours = Math.floor(timeDiff / 60);
            lastSavedText = `${hours} hour${hours !== 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(timeDiff / (60 * 24));
            lastSavedText = `${days} day${days !== 1 ? 's' : ''} ago`;
        }
    }
    
    // Update the status text based on what we have
    if (hasProblems) {
        const problemsCount = JSON.parse(localStorage.getItem('leetCodeProblems')).length;
        let statusText = `${problemsCount} problems stored (${sizeText})`;
        
        if (lastSavedText) {
            statusText += ` · Last saved: ${lastSavedText}`;
        }
        
        if (dataTruncated) {
            statusText += ' · Note: Data was truncated due to storage limits';
            statusElement.className = 'status-warning';
        } else {
            statusElement.className = 'status-success';
        }
        
        statusElement.textContent = statusText;
    } else if (hasCompletedProblems) {
        statusElement.textContent = `Only completed problem status is stored (${sizeText})`;
        statusElement.className = 'status-warning';
    } else {
        statusElement.textContent = 'No data stored in browser';
        statusElement.className = 'status-neutral';
    }
    
    // Check storage quota if browser supports it
    checkStorageQuota().then(quotaInfo => {
        if (quotaInfo.percentUsed > 80) {
            // Add warning if close to quota
            const warning = document.createElement('div');
            warning.className = 'storage-warning';
            warning.textContent = `⚠️ Browser storage is ${Math.round(quotaInfo.percentUsed)}% full. You may need to clear some data.`;
            statusElement.appendChild(warning);
        }
    }).catch(err => {
        console.log('Could not check storage quota', err);
    });
}

// Clear all saved data
function clearSavedData() {
    // Only clear leetcode related items
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('leetCode')) {
            localStorage.removeItem(key);
        }
    }
    
    // Reset global variables if we're not reloading the page
    allProblems = [];
    companies.clear();
    topics.clear();
    timePeriods.clear();
    completedProblems.clear();
    revisionProblems.clear();
    
    // Update UI
    updateStorageStatus();
    
    // Clear the table
    document.getElementById('problems-body').innerHTML = '';
    document.getElementById('problem-count').textContent = '0 problems found';
    document.getElementById('completed-count').textContent = '0 completed (0%)';
    
    // Clear filters
    document.getElementById('company-filter').innerHTML = '<option value="">All Companies</option>';
    document.getElementById('time-period-filter').innerHTML = '<option value="">All Time Periods</option>';
    document.getElementById('topic-filter').innerHTML = '<option value="">All Topics</option>';
    
    // Show no data message
    document.getElementById('no-data-message').style.display = 'block';
    document.getElementById('problems-table').classList.remove('visible');
    
    return true;
}

// Update selected folder display
function updateSelectedFolder(files) {
    const selectedFolder = document.getElementById('selected-folder');
    if (files && files.length > 0) {
        // Get the root folder name
        const path = files[0].webkitRelativePath;
        const rootFolder = path.split('/')[0];
        selectedFolder.textContent = rootFolder;
    } else {
        selectedFolder.textContent = 'No folder selected';
    }
}

// Toggle upload panel
function toggleUploadPanel() {
    const uploadSection = document.querySelector('.upload-section');
    uploadSection.classList.toggle('active');
    
    // Close panel when clicking outside
    if (uploadSection.classList.contains('active')) {
        setTimeout(() => {
            document.addEventListener('click', closeUploadPanelOnClickOutside);
        }, 100);
    } else {
        document.removeEventListener('click', closeUploadPanelOnClickOutside);
    }
}

// Close upload panel when clicking outside
function closeUploadPanelOnClickOutside(event) {
    const uploadSection = document.querySelector('.upload-section');
    if (!uploadSection.contains(event.target)) {
        uploadSection.classList.remove('active');
        document.removeEventListener('click', closeUploadPanelOnClickOutside);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', async () => {
    // Load completed problems
    loadCompletedProblems();
    
    // Load revision problems
    loadRevisionProblems();
    
    // Update storage status display
    updateStorageStatus();
    
    // Try to load saved data from localStorage first
    if (loadAllData()) {
        // If data loaded successfully, update UI
        updateFilterOptions();
        filterProblems();
        updateLoadingStatus('Loaded saved data from previous session');
        
        // Update count of loaded companies in status
        if (companies.size > 0) {
            updateLoadingStatus(`Loaded ${allProblems.length} problems from ${companies.size} companies.`);
        }
    } else {
        // If no saved data, load from question folder
        try {
            await loadDataFromQuestionFolder();
        } catch (error) {
            updateLoadingStatus(`Error loading data: ${error.message}`, true);
            console.error(error);
        }
    }
    
    // Set up Clear Data button
    const clearDataBtn = document.getElementById('clear-data');
    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
                if (clearSavedData()) {
                    updateLoadingStatus('All saved data has been cleared');
                    // Reload data from question folder
                    loadDataFromQuestionFolder();
                }
            }
        });
    }
    
    // Add event listener for search input
    document.getElementById('search-input').addEventListener('input', () => {
        // Debounce search to avoid excessive filtering
        clearTimeout(window.searchTimeout);
        window.searchTimeout = setTimeout(() => {
            filterProblems();
        }, 300);
    });
    
    // Add event listener for show completed filter
    document.getElementById('show-completed').addEventListener('change', filterProblems);
    
    // Add event listener for show revision filter
    if (document.getElementById('show-revision')) {
        document.getElementById('show-revision').addEventListener('change', filterProblems);
    }
    
    // Add event listeners for sortable column headers
    document.querySelectorAll('th.sortable').forEach(th => {
        th.addEventListener('click', () => {
            const sortColumn = th.getAttribute('data-sort');
            
            // If clicking the same column, toggle direction
            if (sortColumn === currentSortColumn) {
                currentSortDirection = currentSortDirection === 'asc' ? 'desc' : 'asc';
            } else {
                currentSortColumn = sortColumn;
                currentSortDirection = 'asc';
            }
            
            filterProblems();
        });
    });
    
    document.getElementById('apply-filters').addEventListener('click', filterProblems);
    
    document.getElementById('reset-filters').addEventListener('click', () => {
        document.getElementById('company-filter').value = '';
        document.getElementById('difficulty-filter').value = '';
        document.getElementById('time-period-filter').value = '';
        document.getElementById('topic-filter').value = '';
        document.getElementById('min-frequency').value = 0;
        document.getElementById('min-acceptance').value = 0;
        document.getElementById('search-input').value = '';
        document.getElementById('show-completed').value = 'all';
        if (document.getElementById('show-revision')) {
            document.getElementById('show-revision').value = 'all';
        }
        filterProblems();
    });
    
    // Set up export to CSV functionality
    document.getElementById('export-csv').addEventListener('click', () => {
        // Get currently filtered problems
        const companyFilter = document.getElementById('company-filter').value;
        const difficultyFilter = document.getElementById('difficulty-filter').value;
        const timePeriodFilter = document.getElementById('time-period-filter').value;
        const topicFilter = document.getElementById('topic-filter').value;
        const minFrequency = parseFloat(document.getElementById('min-frequency').value) || 0;
        const minAcceptance = parseFloat(document.getElementById('min-acceptance').value) || 0;
        const showCompletedFilter = document.getElementById('show-completed').value;
        const searchQuery = document.getElementById('search-input').value.toLowerCase();
        
        const filteredProblems = allProblems.filter(problem => {
            // Check company filter
            if (companyFilter) {
                if (Array.isArray(problem.Companies)) {
                    if (!problem.Companies.includes(companyFilter)) return false;
                } else if (problem.Company !== companyFilter) {
                    return false;
                }
            }
            
            // Check difficulty filter
            if (difficultyFilter && problem.Difficulty !== difficultyFilter) return false;
            
            // Check time period filter
            if (timePeriodFilter) {
                if (Array.isArray(problem.TimePeriods)) {
                    if (!problem.TimePeriods.includes(timePeriodFilter)) return false;
                } else if (problem.TimePeriod !== timePeriodFilter) {
                    return false;
                }
            }
            
            // Check topic filter
            if (topicFilter && (!problem.Topics || !problem.Topics.includes(topicFilter))) return false;
            
            // Check frequency filter
            if (minFrequency > 0) {
                const frequency = parseFloat(problem.Frequency);
                if (isNaN(frequency) || frequency < minFrequency) return false;
            }
            
            // Check acceptance rate filter
            if (minAcceptance > 0) {
                const rateValue = problem["Acceptance Rate"] || problem.Acceptance_Rate;
                const acceptanceRate = parseFloat(rateValue) * 100;
                if (isNaN(acceptanceRate) || acceptanceRate < minAcceptance) return false;
            }
            
            // Check completed filter
            if (showCompletedFilter === 'completed' && !completedProblems.has(problem.Link)) return false;
            if (showCompletedFilter === 'not-completed' && completedProblems.has(problem.Link)) return false;
            
            // Check search query
            if (searchQuery) {
                const title = problem.Title?.toLowerCase() || '';
                
                // Handle company search in either Company string or Companies array
                let companyMatch = false;
                if (Array.isArray(problem.Companies)) {
                    companyMatch = problem.Companies.some(c => c.toLowerCase().includes(searchQuery));
                } else {
                    companyMatch = (problem.Company?.toLowerCase() || '').includes(searchQuery);
                }
                
                // Handle time period search
                let timeMatch = false;
                if (Array.isArray(problem.TimePeriods)) {
                    timeMatch = problem.TimePeriods.some(t => t.toLowerCase().includes(searchQuery));
                } else {
                    timeMatch = (problem.TimePeriod?.toLowerCase() || '').includes(searchQuery);
                }
                
                const topics = problem.Topics?.toLowerCase() || '';
                
                if (!title.includes(searchQuery) && 
                    !companyMatch && 
                    !timeMatch &&
                    !topics.includes(searchQuery)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Add completed status to the problems and format arrays for CSV
        const problemsWithStatus = filteredProblems.map(problem => {
            // Create copy to avoid modifying original
            const formattedProblem = { ...problem };
            
            // Add completed status
            formattedProblem.Completed = completedProblems.has(problem.Link) ? 'Yes' : 'No';
            
            // Add revision status
            formattedProblem.ForRevision = revisionProblems.has(problem.Link) ? 'Yes' : 'No';
            
            // Format Company information
            if (Array.isArray(formattedProblem.Companies)) {
                formattedProblem.Company = formattedProblem.Companies.join(', ');
            }
            
            // Format TimePeriod information
            if (Array.isArray(formattedProblem.TimePeriods)) {
                formattedProblem.TimePeriod = formattedProblem.TimePeriods.join(', ');
            }
            
            return formattedProblem;
        });
        
        // Export filtered problems
        exportToCSV(problemsWithStatus);
    });
});

// Add event listener for page unload to ensure data is saved
window.addEventListener('beforeunload', () => {
    // Save completed problems
    saveCompletedProblems();
    
    // Save revision problems
    saveRevisionProblems();
    
    // No need to save all problems as they are already saved when uploaded/modified
    // and this could cause performance issues during page unload
    
    return undefined; // Allow normal page unload
});
